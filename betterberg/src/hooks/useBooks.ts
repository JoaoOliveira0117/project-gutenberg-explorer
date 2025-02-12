import { BooksContext } from "@/context/books.provider";
import { useContext } from "react";

export function useBooks() {
  return useContext(BooksContext);
}