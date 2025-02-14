'use client'
import { useBooks } from "@/hooks/useBooks";
import BookCardGrid from "./BookCard/Grid";
import SearchBooks from "./SearchBooks";
import { Button } from "./ui/button";
import { CgSpinner  } from "react-icons/cg";

export default function AllBooks() {
  const { books, canFetchMore, isFetching, isLoading, error, favoriteBook, removeFavoriteBook, setPage, getMoreBooks } = useBooks();

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    getMoreBooks();
  }

  if (isLoading) return (
    <div className="max-w-6xl mx-auto mt-12">
      <CgSpinner size={64} className="animate-spin min-h-8 min-w-8 text-blue-600 m-auto" />
    </div>
  );

  if (error) return (
    <div className="max-w-6xl mx-auto mt-12">
      <h1 className="text-4xl text-center text-red-600">An error occurred while fetching books</h1>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto mb-16">
      <div className="w-full mt-12 m-4">
        <SearchBooks />
      </div>
      <BookCardGrid books={books} addFavorite={favoriteBook} removeFavorite={removeFavoriteBook}/>
      <div className="w-full mt-12 m-4 flex justify-center items-center">
        <Button variant={"default"} onClick={handleLoadMore} disabled={!canFetchMore || isFetching} className="
          text-xl text-white text-center m-auto bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all duration-200
          py-6 px-16 rounded-md shadow-md"
        >
          { isFetching ? <CgSpinner size={42} className="animate-spin min-h-8 min-w-8 text-white ml-2" /> : "Load More" }
        </Button>
      </div>
    </div>
  );
}
