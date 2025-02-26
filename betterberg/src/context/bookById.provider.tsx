import { createContext, ReactNode, useEffect, useState } from "react"
import { Book } from "@/types";
import { useFetch } from "@/hooks/useFetch";

type BookByIdContextType = {
  book: Book | null;
  isLoading: boolean;
  isFetching: boolean;
  error: any | null;
  textLoaded: boolean;
  setId: (id: string) => void;
  setTextLoaded: (v: boolean) => void;
}

type Props = {
  children: ReactNode;
}

export const BookByIdContext = createContext<BookByIdContextType>({
  book: null,
  isLoading: false,
  isFetching: false,
  error: null,
  textLoaded: false,
  setId: () => {},
  setTextLoaded: () => {}
})

const BookByIdProvider: React.FC<Props> = ({ children }) => {
  const [id, setId] = useState("");
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<any | null>(null);
  const [textLoaded, setTextLoaded] = useState(false);

  const fetcher = useFetch()

  const getBook = async () => {
    if (isLoading || isFetching) return;

    setBook(null)
    setIsFetching(true)
    setIsLoading(true)

    return fetcher(fetch('/api/books/' + id))
      .then((data) => {
        setBook(data.result)
      })
      .catch(setError)
      .finally(() => {
        setError(null)
        setIsFetching(false)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (!id) return;
    getBook();
  }, [id])

  return (
    <BookByIdContext.Provider value={
      {
        book,
        isLoading,
        isFetching,
        error,
        setId,
        setTextLoaded,
        textLoaded,
      }
    }>
      {children}
    </BookByIdContext.Provider>
  );
}

export default BookByIdProvider;