import { createContext, ReactNode, useEffect, useState } from "react"
import { Book } from "@/types";
import { useFetch } from "@/hooks/useFetch";

type FavoriteBooksContextType = {
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

export const FavoriteBooksContext = createContext<FavoriteBooksContextType>({
  books: [],
  isLoading: false,
  isFetching: false,
  error: null,
  getBooks: async () => {},
  clearBooks: () => {},
  favoriteBook: () => {},
  removeFavoriteBook: () => {},
})

const FavoriteBooksProvider: React.FC<Props> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<any | null>(null);

  const fetcher = useFetch()

  const getBooks = async () => {
    if (isFetching) return;

    setBooks([])
    setIsFetching(true)
    setIsLoading(true)

    return fetcher(fetch('/api/books/favorites'))
      .then((data) => {
        setBooks(data.result)
      })
      .catch(setError)
      .finally(() => {
        setError(null)
        setIsFetching(false)
        setIsLoading(false)
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
        setError(null)
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
        setError(null)
        setIsFetching(false)
      })
  }

  const clearBooks = () => {
    setBooks([])
  }

  useEffect(() => {
    setIsLoading(true)
    getBooks()
  }, [])

  return (
    <FavoriteBooksContext.Provider value={
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
    </FavoriteBooksContext.Provider>
  );
}

export default FavoriteBooksProvider;