export interface BooksReturnType {
  id: number;
  book_id: number;
  title: string;
  authors: string[];
  issue_date: string;
  language: string;
  lloc: string;
  subjects: string[];
  tags: string[];
  created_at: string;
}

export interface BooksRequestType {
  book_id: number;
  title?: string; // Default: Untitled
  authors?: string[]; // Default: []
  issue_date?: string;
  language?: string;
  lloc?: string;
  subjects?: string[]; // Default: []
  tags?: string[]; // Default: []
  created_at?: string; // Default: now()
}

export interface UserFavoriteBooksReturnType {
  user_id: number;
  book_id: number;
  created_at: string;
}

export interface UserFavoriteBooksRequestType {
  user_id: number;
  book_id: number;
  created_at: string;
}

export interface UserLastSeenBooksReturnType {
  user_id: number;
  book_id: number;
  created_at: string;
}

export interface UserLastSeenBooksRequestType {
  user_id: number;
  book_id: number;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      books: {
        Row: BooksReturnType;
        Insert: BooksRequestType;
        Update: Partial<BooksRequestType>;
      },
      user_favorite_books: {
        Row: UserFavoriteBooksReturnType;
        Insert: UserFavoriteBooksRequestType;
      },
      user_last_seen_books: {
        Row: UserLastSeenBooksReturnType;
        Insert: UserLastSeenBooksRequestType;
      }
    }
  }
}