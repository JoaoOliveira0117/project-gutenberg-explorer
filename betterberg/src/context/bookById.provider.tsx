import { createContext, ReactNode, useState } from "react"
import { Book } from "@/types";
import { getBookById } from "./api/books.api";

type BookByIdContextType = {
  book: Book | null;
  isLoading: boolean;
  isFetching: boolean;
  error: any | null;
  getBook: (id: string) => void;
}

type Props = {
  children: ReactNode;
}

export const BookByIdContext = createContext<BookByIdContextType>({
  book: null,
  isLoading: false,
  isFetching: false,
  error: null,
  getBook: () => {}
})

const BookByIdProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<any | null>(null);

  const [book, setBook] = useState<Book | null>(null);

  const getBook = async (id: string) => {
    if (isLoading || isFetching) return;

    setBook(null)
    setIsFetching(true)
    setIsLoading(true)

    try {
      const fetchedBook = await getBookById(id)
      setBook(fetchedBook)
    } catch (error) {
      setError(error)
    } finally {
      setIsFetching(false)
      setIsLoading(false)
    }
  }

  return (
    <BookByIdContext.Provider value={
      {
        book,
        isLoading,
        isFetching,
        error,
        getBook,
      }
    }>
      {children}
    </BookByIdContext.Provider>
  );
}

export default BookByIdProvider;