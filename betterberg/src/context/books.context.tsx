import { Book } from "@/types";
import { createContext } from "react";

type booksContextType = {
  books: Book[];
  searchQuery: string;
  isLoading: boolean;
  isFetching: boolean;
  setBooks: (books: Book[] | ((p: Book[]) => Book[])) => void;
  setSearchQuery: (query: string) => void;
  setFavorite: (id: string, callback: (v: boolean) => void) => void;
  removeFavorite: (id: string, callback: (v: boolean) => void) => void;
}

const BooksContext = createContext<booksContextType>({
  books: [],
  searchQuery: "",
  isLoading: false,
  isFetching: false,
  setBooks: () => {},
  setSearchQuery: () => {},
  setFavorite: () => {},
  removeFavorite: () => {},
})

export default BooksContext;