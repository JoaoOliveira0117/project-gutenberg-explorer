from dotenv import load_dotenv
import json
from src.config import get_env
from src.subscriber_client import subscribe

load_dotenv()

def callback(message):
  books = json.loads(message.data.decode('utf-8'))

  for book in books:
    print(f"New book found: {book['title']}")

  message.ack()

config = get_env()
project_id = config.get('PROJECT_ID')

future = subscribe(project_id, callback)

try:
  future.result()
except KeyboardInterrupt:
  print("Interrupted")