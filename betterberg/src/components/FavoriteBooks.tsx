'use client'
import { useFavoriteBooks } from "@/hooks/useFavoriteBooks";
import BookCardGrid from "./BookCard/Grid";
import TryAgain from "./TryAgain/TryAgain";

export default function FavoriteBooks() {
  const { books, isLoading, isFetching, error, favoriteBook, removeFavoriteBook, getBooks } = useFavoriteBooks();
  
  if (error) return (
    <TryAgain onTryAgain={() => getBooks()} isLoading={isLoading || isFetching} />
  )


  if (!isLoading && !isFetching && !books.length) return (
    <div className="max-w-6xl mx-auto mt-12">
      <h1 className="text-lg text-center text-gray-400">No favorite books found :(</h1>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto">
      <BookCardGrid books={books} addFavorite={favoriteBook} removeFavorite={removeFavoriteBook} isLoading={isLoading}/>
    </div>
  );
}
