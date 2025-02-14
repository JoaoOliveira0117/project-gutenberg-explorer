import { createContext, ReactNode, useEffect, useState } from "react"
import { Book } from "@/types";
import { getAllBooks } from "./api/books.api";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import toQueryString from "@/utils/toQueryString";

type BooksContextType = {
  books: Book[];
  isLoading: boolean;
  isFetching: boolean;
  error: any | null;
  getBooks: () => Promise<void>;
  getMoreBooks: () => Promise<void>;
  setPage: (page: number) => void;
  setQuery: (query: string) => void;
  clearBooks: () => void;
  favoriteBook: (id: string, callback: (v: boolean) => void) => void;
  removeFavoriteBook: (id: string, callback: (v: boolean) => void) => void;
}

type Props = {
  children: ReactNode;
}

export const BooksContext = createContext<BooksContextType>({
  books: [],
  isLoading: false,
  isFetching: false,
  error: null,
  getBooks: async () => {},
  getMoreBooks: async () => {},
  setPage: () => {},
  setQuery: () => {},
  clearBooks: () => {},
  favoriteBook: () => {},
  removeFavoriteBook: () => {},
})

const BooksProvider: React.FC<Props> = ({ children }) => {
  const START_PAGE = 1;
  const PAGE_SIZE = 25;

  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<any | null>(null);
  const [page, setPage] = useState(START_PAGE);
  const [query, setQuery] = useState<string>("");

  const fetcher = useFetch()

  const getBooks = async () => {
    if (isLoading || isFetching) return;

    setBooks([])
    setIsFetching(true)
    setIsLoading(true)

    const queryParams = toQueryString({
      search: query.trim(),
      page: 1,
      pageSize: PAGE_SIZE,
    })

    return fetcher(fetch('/api/books' + queryParams))
      .then((data) => {
        setBooks(data.result)
      })
      .catch(setError)
      .finally(() => {
        setIsFetching(false)
        setIsLoading(false)
      })
  }

  const getMoreBooks = async () => {
    if (isLoading || isFetching) return;

    setBooks([])
    setIsFetching(true)

    const queryParams = toQueryString({
      search: query.trim(),
      page: page,
      pageSize: PAGE_SIZE,
    })

    return fetcher(fetch('/api/books' + queryParams))
      .then((data) => {
        setBooks((previousValue) => [...previousValue, ...data.result])
      })
      .catch(setError)
      .finally(() => {
        setIsFetching(false)
      })
  }

  const favoriteBook = async (id: string, callback: (v: boolean) => void) => {
    if (isLoading || isFetching) return;

    setIsFetching(true)
    callback(true)

    return fetcher(fetch(`/api/books/${id}/favorite`, {
      method: 'PUT',
    }))
      .then(() => {
        setBooks((previousValue) => {
          const index = previousValue.findIndex((book) => book.id === id)
          const updatedBook = { ...previousValue[index], user_last_seen_books: {
            book_id: id,
            created_at: new Date().toISOString(),
          }}
          return [...previousValue.slice(0, index), updatedBook, ...previousValue.slice(index + 1)]
        })
      })
      .catch((err) => {
        setError(err)
        callback(false)
      })
      .finally(() => {
        setIsFetching(false)
      })
  }
  
  const removeFavoriteBook = async (id: string, callback: (v: boolean) => void) => {
    if (isLoading || isFetching) return;

    setIsFetching(true)
    callback(false)

    return fetcher(fetch(`/api/books/${id}/favorite`, {
      method: 'DELETE',
    }))
      .then(() => {
        setBooks((previousValue) => {
          const index = previousValue.findIndex((book) => book.id === id)
          const updatedBook = { ...previousValue[index], user_last_seen_books: null }
          return [...previousValue.slice(0, index), updatedBook, ...previousValue.slice(index + 1)]
        })
      })
      .catch((err) => {
        setError(err)
        callback(true)
      })
      .finally(() => {
        setIsFetching(false)
      })
  }

  const clearBooks = () => {
    setBooks([])
  }

  useEffect(() => {
    getBooks()
  }, [query])

  return (
    <BooksContext.Provider value={
      {
        books,
        isLoading,
        isFetching,
        error,
        getBooks,
        getMoreBooks,
        setPage,
        setQuery,
        clearBooks,
        favoriteBook,
        removeFavoriteBook,
      }
    }>
      {children}
    </BooksContext.Provider>
  );
}

export default BooksProvider;