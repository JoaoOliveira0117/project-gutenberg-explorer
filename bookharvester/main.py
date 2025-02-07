import json
from dotenv import load_dotenv
from src.from_pgcatalog_csv import from_pgcatalog_csv
from src.publisher_client import publish
from src.config import get_env
from src.logs import log

load_dotenv()
config = get_env()
project_id = config.get("PROJECT_ID")
batch_size = config.get("BATCH_SIZE")

def publish_books():
  books = from_pgcatalog_csv()
  futures = []

  for i in range(0, len(books), batch_size):
    log(f"Publishing book batch: {i}/{len(books)}")
    batch = books[i:i + batch_size]
    message_json = json.dumps(batch).encode("utf-8")

    futures.append(publish(project_id, message_json))

  for future in futures:
    future.result()

publish_books()