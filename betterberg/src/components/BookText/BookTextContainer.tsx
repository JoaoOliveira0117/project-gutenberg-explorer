"use client";

import { Container } from "@mui/material";
import BookText from "./BookText";
import { useEffect, useState } from "react";
import Header from "./Header";
import { Book } from "@/types";
import { useBook } from "@/hooks/useBook";

type Props = {
  id: string;
}

const BookTextContainer: React.FC<Props> = ({ id }) => {
  const { book, setId } = useBook();

  useEffect(() => {
    setId(id);
  }, [id]);

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