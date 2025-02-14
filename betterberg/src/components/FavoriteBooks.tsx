'use client'
import { useFavoriteBooks } from "@/hooks/useFavoriteBooks";
import BookCardGrid from "./BookCard/Grid";

export default function FavoriteBooks() {
  const { books, isLoading, error, favoriteBook, removeFavoriteBook } = useFavoriteBooks();
  
  if (error) return (
    <div className="max-w-6xl mx-auto mt-12">
      <h1 className="text-4xl text-center text-red-600">An error occurred while fetching books</h1>
    </div>
  )

  if (!books.length) return (
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
