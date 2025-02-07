import json
import asyncio
from dotenv import load_dotenv
from src.config import get_env
from src.db import initialize_client
from google.cloud import pubsub_v1

load_dotenv()

config = get_env()
project_id = config.get('PROJECT_ID')

db = initialize_client(config.get('DB_URL'), config.get('DB_KEY'))

subscriber = pubsub_v1.SubscriberClient()
subscription_path = subscriber.subscription_path(project_id, "gutenberg-bookharvester-sub")

async def upsert_books_batch(books):
  try:
    for i in range(0, len(books), 90):
      batch = books[i:i + 90]
      print(f"Inserindo batch de {len(batch)} livros...")

      await asyncio.to_thread(
        db.table('books').upsert(batch, on_conflict=['book_id', 'id']).execute
      )

      await asyncio.sleep(1)  
  except Exception as e:
      print(f"Erro ao inserir livros: {e}")

def callback(message: pubsub_v1.subscriber.message.Message) -> None:
  books = json.loads(message.data.decode('utf-8'))
  asyncio.run(upsert_books_batch(books))
  message.ack()

streaming_pull_future = subscriber.subscribe(subscription_path, callback=callback)

with subscriber:
  try:
      streaming_pull_future.result(timeout=5.0)
  except TimeoutError:
      streaming_pull_future.cancel()
      streaming_pull_future.result()