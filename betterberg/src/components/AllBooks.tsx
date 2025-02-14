'use client'
import { useBooks } from "@/hooks/useBooks";
import BookCardGrid from "./BookCard/Grid";
import SearchBooks from "./SearchBooks";

export default function AllBooks() {
  const { books } = useBooks();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="w-full mt-12 m-4">
        <SearchBooks />
      </div>
      <BookCardGrid books={books}/>
    </div>
  );
}
