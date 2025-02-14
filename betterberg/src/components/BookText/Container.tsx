"use client";

import BookText from "./Text";
import { useEffect } from "react";
import Header from "./Header";
import { useBook } from "@/hooks/useBook";

type Props = {
  id: string;
}

const BookTextContainer: React.FC<Props> = ({ id }) => {
  const { book, setId } = useBook();

  useEffect(() => {
    setId(id);
  }, [id, setId]);

  if (!book) {
    return null;
  }

  return (
    <>
      <Header book={book} />
      <article className="max-w-6xl mx-auto my-6 shadow-lg rounded-md border">
        <BookText id={book.book_id || ""} />
      </article>
    </>
  );
}

export default BookTextContainer;