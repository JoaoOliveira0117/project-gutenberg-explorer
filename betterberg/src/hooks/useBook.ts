import { BookByIdContext } from "@/context/bookById.provider";
import { useContext } from "react";

export function useBook() {
  return useContext(BookByIdContext);
}