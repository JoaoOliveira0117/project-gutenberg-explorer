export type Book = {
  id: string;
  book_id: string;
  title: string;
  authors: string[];
  subjects: string[];
  tags: string[];
  language: string;
  user_favorite_books: {
    book_id: string;
  } | null;
  book_url: string | null;
}

export type User = {
  id: string;
  email: string;
  username: string;
  profile_pic: string;
  created_at: string;
}