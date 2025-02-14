"use client";

import BookText from "./Text";
import { useEffect } from "react";
import Header from "./Header";
import { useBook } from "@/hooks/useBook";
import { CgSpinner } from "react-icons/cg";

type Props = {
  id: string;
}

const BookTextContainer: React.FC<Props> = ({ id }) => {
  const { book, isLoading, error, setId } = useBook();

  useEffect(() => {
    setId(id);
  }, [id, setId]);

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

  if (!book) return (
    <div className="max-w-6xl mx-auto mt-12">
      <h1 className="text-lg text-center text-gray-400">Unable to display book</h1>
    </div>
  )

  return (
    <>
      <Header book={book} />
      <article className="max-w-6xl mx-auto my-6 mb-28 shadow-lg rounded-md border">
        <BookText id={book.book_id || ""} />
      </article>
    </>
  );
}

export default BookTextContainer;