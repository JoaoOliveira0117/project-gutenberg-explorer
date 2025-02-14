import { FavoriteBooksContext } from "@/context/favoriteBooks.provider";
import { useContext } from "react";

export function useFavoriteBooks() {
  return useContext(FavoriteBooksContext);
}