'use client'
import BookCardGrid from "./BookCard/Grid";
import { useLastSeenBooks } from "@/hooks/useLastSeenBooks";
import TryAgain from "./TryAgain/TryAgain";

export default function LastSeenBooks() {
  const { books, isLoading, isFetching, error, favoriteBook, removeFavoriteBook, getBooks } = useLastSeenBooks();

  if (error) return (
    <TryAgain onTryAgain={() => getBooks()} isLoading={isLoading || isFetching} />
  )
  
  if (!isLoading && !isFetching && !books.length) return (
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
