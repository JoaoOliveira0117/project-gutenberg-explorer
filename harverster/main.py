import json
from dotenv import load_dotenv
from src.from_pgcatalog_csv import from_pgcatalog_csv
from src.publisher_client import publish
from src.config import get_env
from src.logs import log
from src.db import initialize_client

load_dotenv()
config = get_env()
project_id = config.get("PROJECT_ID")
batch_size = int(config.get("BATCH_SIZE", 500))  # Default to 500 if not set

db = initialize_client(config.get("DB_URL"), config.get("DB_KEY"))

def publish_books(event, context):
    """Google Cloud Function triggered by Pub/Sub to upsert books in batches."""
    books = from_pgcatalog_csv()
    
    if not books:
        log("No books found to insert.")
        return

    log(f"Fetched {len(books)} books from Gutenberg. Starting batch upserts...")

    for i in range(0, len(books), batch_size):
        batch = books[i:i + batch_size]
        
        log(f"Upserting batch {i // batch_size + 1}/{-(-len(books) // batch_size)} with {len(batch)} books...")

        try:
            db.table("books").upsert(batch).execute()
            log(f"Batch {i // batch_size + 1} upserted successfully.")
        except Exception as e:
            log(f"Error upserting batch {i // batch_size + 1}: {e}")

    log("All books have been upserted.")
