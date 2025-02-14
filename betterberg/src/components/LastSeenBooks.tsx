'use client'
import BookCardGrid from "./BookCard/Grid";
import SearchBooks from "./SearchBooks";
import { useLastSeenBooks } from "@/hooks/useLastSeenBooks";

export default function LastSeenBooks() {
  const { books, favoriteBook, removeFavoriteBook } = useLastSeenBooks();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="w-full mt-12 m-4">
        <SearchBooks />
      </div>
      <BookCardGrid books={books} addFavorite={favoriteBook} removeFavorite={removeFavoriteBook}/>
    </div>
  );
}
