export type Book = {
  id: string;
  book_id: string;
  title: string;
  authors: string[];
  subjects: string[];
  tags: string[];
  language: string;
  user_favorite_books: { 
    user_id: string;
    book_id: string;
  };
}