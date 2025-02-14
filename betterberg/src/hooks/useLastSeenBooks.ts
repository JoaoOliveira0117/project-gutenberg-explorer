import { LastSeenBooksContext } from "@/context/lastSeenBooks.provider";
import { useContext } from "react";

export function useLastSeenBooks() {
  return useContext(LastSeenBooksContext);
}