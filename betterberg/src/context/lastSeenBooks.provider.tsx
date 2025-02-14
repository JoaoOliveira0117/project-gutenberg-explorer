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
      }
    }>
      {children}
    </LastSeenBooksContext.Provider>
  );
}

export default LastSeenBooksProvider;