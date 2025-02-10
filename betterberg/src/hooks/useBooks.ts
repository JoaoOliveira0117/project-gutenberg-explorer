import BooksContext from "@/context/books.context";
import { useContext } from "react";

export function useBooks() {
  return useContext(BooksContext);
}