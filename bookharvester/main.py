"""
import requests
from bs4 import BeautifulSoup

url = 'https://gutenberg.org'

res = requests.get(f"{url}/ebooks/search/?query=")

html = res.text

soup = BeautifulSoup(html, 'html.parser')

books = soup.find_all('li', class_='booklink')

def get_books_json(books):
  books_json = []
  for book in books:
    title = book.find('span', class_='title').text.strip()
    image_url = f"{url}{book.find('img', class_='cover-thumb')['src']}"
    author = book.find('span', class_='subtitle').text.strip()
    link = f"{url}{book.find('a')['href']}"
    books_json.append({
      'title': title,
      'author': author,
      'link': link,
      'image_url': image_url,
    })
  return books_json


print(get_books_json(books))
"""
import json
from dotenv import load_dotenv
from src.from_pgcatalog_csv import from_pgcatalog_csv
from src.publisher_client import publish
from src.config import get_env

load_dotenv()
config = get_env()

def publish_books():
  books = from_pgcatalog_csv()
  project_id = config.get("PROJECT_ID")
  futures = []

  for i in range(0, 100, config.get("BATCH_SIZE")):
    batch = books[i:i + config.get("BATCH_SIZE")]
    message_json = json.dumps(batch).encode("utf-8")

    futures.append(publish(project_id, message_json))

  for future in futures:
    future.result()

publish_books()