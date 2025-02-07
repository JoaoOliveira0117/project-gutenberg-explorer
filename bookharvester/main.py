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
batch_size = config.get("BATCH_SIZE")

db = initialize_client(config.get('DB_URL'), config.get('DB_KEY'))

def publish_books():
  books = from_pgcatalog_csv()\
  
  # batch upsert with trycatch with ValueError exception

  for book in books:
    try:
      db.table("books").upsert(book).execute()
    except ValueError as e:
      print(f"Error upserting book {book}: {e}")

publish_books()