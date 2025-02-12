import { createContext, ReactNode, useEffect, useState } from "react"
import { Book } from "@/types";
import { getAllBooks } from "./api/books.api";

type BooksContextType = {
  books: Book[];
  isLoading: boolean;
  isFetching: boolean;
  error: any | null;
  clearBooks: () => void;
  getBooks: (page?: number, pageSize?: number) => Promise<void>;
  searchBooks: (query: string, page?: number, pageSize?: number) => Promise<void>;
  loadMoreBooks: (query: string, page?: number, pageSize?: number) => Promise<void>;
}

type Props = {
  children: ReactNode;
}

export const BooksContext = createContext<BooksContextType>({
  books: [],
  isLoading: false,
  isFetching: false,
  error: null,
  clearBooks: () => {},
  getBooks: async () => {},
  searchBooks: async () => {},
  loadMoreBooks: async () => {},
})

const BooksProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<any | null>(null);

  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const clearBooks = () => {
    setBooks([])
  }

  const getBooks = async (page?: number, pageSize?: number) => {
    if (isLoading || isFetching) return;

    setIsFetching(true)
    setIsLoading(true)

    try {
      const fetchedBooks = await getAllBooks(searchQuery, page, pageSize)
      setBooks(fetchedBooks)
    } catch (error) {
      setError(error)
    } finally {
      setIsFetching(false)
      setIsLoading(false)
    }
  }

  const searchBooks = async (query: string, page?: number, pageSize?: number) => {
    if (isLoading || isFetching) return;

    setSearchQuery(query)
    setBooks([])
    setIsFetching(true)
    setIsLoading(true)

    try {
      const fetchedBooks = await getAllBooks(query, page, pageSize)
      setBooks(fetchedBooks)
    } catch (error) {
      setError(error)
    } finally {
      setIsFetching(false)
      setIsLoading(false)
    }
  }

  const loadMoreBooks = async (query: string, page?: number, pageSize?: number) => {
    if (isLoading || isFetching) return;

    setBooks([])
    setIsFetching(true)
    setIsLoading(true)

    try {
      const fetchedBooks = await getAllBooks(query, page, pageSize)
      setBooks(prevBooks => [...prevBooks,...fetchedBooks])
    } catch (error) {
      setError(error)
    } finally {
      setIsFetching(false)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log("AKJHBASFKJHSGDFKLB")
    getBooks()
  }, [])

  return (
    <BooksContext.Provider value={
      {
        books,
        isLoading,
        isFetching,
        error,
        clearBooks,
        getBooks,
        searchBooks,
        loadMoreBooks,
      }
    }>
      {children}
    </BooksContext.Provider>
  );
}

export default BooksProvider;