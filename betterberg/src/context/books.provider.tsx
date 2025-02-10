import { ReactNode, useEffect, useState } from "react"
import BooksContext from "./books.context";
import { Book } from "@/types";
import { deleteBookFavorite, getAllBooks, putBookFavorite } from "@/services/booksApi";

type Props = {
  children: ReactNode;
}

const BooksProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getBooks = async () => {
    console.log("called")
    setIsFetching(true)
    await getAllBooks(searchQuery)
      .then(books => setBooks(books))
      .finally(() => setIsFetching(false))
  }

  const setFavorite = async (id: string, callback: (v: boolean) => void) => {
    callback(true)

    await putBookFavorite(id).then(res => {
      if (res.ok) {
        const updatedBooks = books.map(book =>
          book.book_id === id ? {
            ...book, user_favorite_books: { 
              book_id: book.book_id 
            } 
          } : book
        );
        return setBooks(updatedBooks);
      }

      callback(false)
    })
  }

  const removeFavorite = async (id: string, callback: (v: boolean) => void) => {
    callback(false)

    await deleteBookFavorite(id).then(res => {
      if (res.ok) {
        const updatedBooks = books.map(book =>
          book.book_id === id ? {
            ...book, user_favorite_books: null
          } : book
        );
        return setBooks(updatedBooks);
      }

      callback(true)
    })
  }

  useEffect(() => {
    setIsLoading(true)
    getBooks().finally(() => {
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    setBooks([])
    getBooks()
  }, [searchQuery])

  return (
    <BooksContext.Provider value={
      {
        books,
        searchQuery,
        isLoading,
        isFetching,
        setBooks,
        setSearchQuery,
        setFavorite,
        removeFavorite
      }
    }>
      {children}
    </BooksContext.Provider>
  );
}

export default BooksProvider;