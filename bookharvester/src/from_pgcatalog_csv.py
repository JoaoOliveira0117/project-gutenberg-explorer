import pandas

csv_url = "https://www.gutenberg.org/cache/epub/feeds/pg_catalog.csv"

def from_pgcatalog_csv():
  result = pandas.read_csv(csv_url)
  books = []
  for iterrow in result.iterrows():
    row = iterrow[1]

    books.append({
      'id': row['Text#'],
      'title': row['Title'],
      'authors': str(row['Authors']).split(';'),
      'year_published': row['Issued'],
      'language': row['Language'],
      'locc': row['LoCC'],
      'subjects': str(row['Subjects']).split(';'),
      'tags': str(row['Bookshelves']).split(';'),
    })

  return books

