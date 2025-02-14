'use client'
import { useFavoriteBooks } from "@/hooks/useFavoriteBooks";
import BookCardGrid from "./BookCard/Grid";
import SearchBooks from "./SearchBooks";

export default function FavoriteBooks() {
  const { books, favoriteBook, removeFavoriteBook } = useFavoriteBooks();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="w-full mt-12 m-4">
        <SearchBooks />
      </div>
      <BookCardGrid books={books} addFavorite={favoriteBook} removeFavorite={removeFavoriteBook}/>
    </div>
  );
}
