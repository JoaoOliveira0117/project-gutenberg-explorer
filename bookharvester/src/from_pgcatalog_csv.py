from pandas import read_csv
from .logs import log
import math

csv_url = "https://www.gutenberg.org/cache/epub/feeds/pg_catalog.csv"

def from_pgcatalog_csv():
  books = []

  try: 
    log("Fetching books from Gutenberg's `pg_catalog.csv`")
    result = read_csv(csv_url)
    for iterrow in result.iterrows():
      row = iterrow[1]

      books.append({
        'id': row.get('Text#'),
        'book_id': row.get('Text#'),
        'title': row.get('Title') or "Untitled",
        'authors': str(row.get('Authors') or "").split(';') if row.get('Authors') else [],
        'issue_date': row.get('Issued') if row.get('Issued') and not (isinstance(row.get('Issued'), float) and math.isnan(row.get('Issued'))) else "",
        'language': row.get('Language') or "",
        'locc': row.get('LoCC') or "",
        'subjects': str(row.get('Subjects') or "").split(';') if row.get('Subjects') else [],
        'tags': str(row.get('Bookshelves') or "").split(';') if row.get('Bookshelves') else [],
      })
  except Exception as e:
    log(f"Error fetching books from Gutenberg's `pg_catalog.csv`: {str(e)}")
  finally:
    return books

