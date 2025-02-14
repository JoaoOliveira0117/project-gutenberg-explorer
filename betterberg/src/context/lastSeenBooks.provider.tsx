import { createContext, ReactNode, useEffect, useState } from "react"
import { Book } from "@/types";
import { useFetch } from "@/hooks/useFetch";

type LastSeenBooksContextType = {
  books: Book[];
  isLoading: boolean;
  isFetching: boolean;
  error: any | null;
  getBooks: () => Promise<void>;
  clearBooks: () => void;
  favoriteBook: (id: string, callback: (v: boolean) => void) => void;
  removeFavoriteBook: (id: string, callback: (v: boolean) => void) => void;
}

type Props = {
  children: ReactNode;
}

export const LastSeenBooksContext = createContext<LastSeenBooksContextType>({
  books: [],
  isLoading: false,
  isFetching: false,
  error: null,
  getBooks: async () => {},
  clearBooks: () => {},
  favoriteBook: () => {},
  removeFavoriteBook: () => {},
})

const LastSeenBooksProvider: React.FC<Props> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<any | null>(null);

  const fetcher = useFetch()

  const getBooks = async () => {
    if (isLoading || isFetching) return;

    setBooks([])
    setIsFetching(true)
    setIsLoading(true)

    return fetcher(fetch('/api/books/last-seen'))
      .then((data) => {
        setBooks(data.result)
      })
      .catch(setError)
      .finally(() => {
        setIsFetching(false)
        setIsLoading(false)
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
  }, [])

  return (
    <LastSeenBooksContext.Provider value={
      {
        books,
        isLoading,
        isFetching,
        error,
        getBooks,
        clearBooks,
        favoriteBook,
        removeFavoriteBook,
      }
    }>
      {children}
    </LastSeenBooksContext.Provider>
  );
}

export default LastSeenBooksProvider;