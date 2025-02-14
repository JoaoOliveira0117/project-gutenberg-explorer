'use client'
import BookCardGrid from "./BookCard/Grid";
import { useLastSeenBooks } from "@/hooks/useLastSeenBooks";

export default function LastSeenBooks() {
  const { books, isLoading, error, favoriteBook, removeFavoriteBook } = useLastSeenBooks();

  if (error) return (
    <div className="max-w-6xl mx-auto mt-12">
      <h1 className="text-4xl text-center text-red-600">An error occurred while fetching books</h1>
    </div>
  )

  if (!books.length) return (
    <div className="max-w-6xl mx-auto mt-12">
      <h1 className="text-lg text-center text-gray-400">No books visited recently</h1>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto">
      <BookCardGrid books={books} addFavorite={favoriteBook} removeFavorite={removeFavoriteBook} isLoading={isLoading}/>
    </div>
  );
}
