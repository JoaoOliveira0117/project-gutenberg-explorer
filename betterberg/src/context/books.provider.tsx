import { createContext, ReactNode, useEffect, useState } from "react"
import { Book } from "@/types";
import { useFetch } from "@/hooks/useFetch";
import toQueryString from "@/utils/toQueryString";

type BooksContextType = {
  books: Book[];
  isLoading: boolean;
  isFetching: boolean;
  error: any | null;
  canFetchMore: boolean;
  getBooks: () => Promise<void>;
  getMoreBooks: () => Promise<void>;
  setPage: (page: number | ((prev: number) => number)) => void;
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
  canFetchMore: false,
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
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<any | null>(null);
  const [page, setPage] = useState(START_PAGE);
  const [query, setQuery] = useState<string>("");
  const [canFetchMore, setCanFetchMore] = useState(true);

  const fetcher = useFetch()

  const getBooks = async () => {
    if (isFetching) return;

    setBooks([])
    setIsFetching(true)
    setIsLoading(true)

    const queryParams = toQueryString({
      search: query.trim(),
      page: 1,
      pageSize: PAGE_SIZE,
    })

    return fetcher(fetch('/api/books' + queryParams, {
      cache: 'no-store',
    }))
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
    if (isFetching || !canFetchMore) return;

    setIsFetching(true)

    const queryParams = toQueryString({
      search: query.trim(),
      page: page,
      pageSize: PAGE_SIZE,
    })

    return fetcher(fetch('/api/books' + queryParams))
      .then((data) => {
        setCanFetchMore(data.result.length >= PAGE_SIZE);
        setBooks((previousValue) => [...previousValue, ...data.result])
      })
      .catch(setError)
      .finally(() => {
        setIsFetching(false)
      })
  }

  const favoriteBook = async (id: string, callback: (v: boolean) => void) => {
    if (isFetching) return;

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
    if (isFetching) return;

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
    setIsLoading(false)
    getBooks()
  }, [query])

  return (
    <BooksContext.Provider value={
      {
        books,
        isLoading,
        isFetching,
        error,
        canFetchMore,
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