import pandas as pd
from .logs import log
import math

csv_url = "https://www.gutenberg.org/cache/epub/feeds/pg_catalog.csv"

def from_pgcatalog_csv():
  books = []

  try: 
    log("Fetching books from Gutenberg's `pg_catalog.csv`")
    result = pd.read_csv(csv_url, dtype=str)

    for _, row in result.iterrows():
      books.append({
        'id': row.get('Text#'),
        'book_id': row.get('Text#'),
        'title': row.get('Title') or "Untitled",
        'authors': [author.strip() for author in str(row.get('Authors') or "").split(';') if pd.notna(author) and author.strip()],
        'issue_date': row.get('Issued') if pd.notna(row.get('Issued')) else "",
        'language': row.get('Language') if pd.notna(row.get('Language')) else "",
        'locc': row.get('LoCC') if pd.notna(row.get('LoCC')) else "",
        'subjects': [subject.strip() for subject in str(row.get('Subjects') or "").split(';') if pd.notna(subject) and subject.strip()],
        'tags': [tag.strip() for tag in str(row.get('Bookshelves') or "").split(';') if pd.notna(tag) and tag.strip()],
      })
  except Exception as e:
    log(f"Error fetching books from Gutenberg's `pg_catalog.csv`: {str(e)}")
  finally:
    return books

