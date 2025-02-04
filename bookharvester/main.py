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

from src.from_pgcatalog_csv import from_pgcatalog_csv

from_pgcatalog_csv()