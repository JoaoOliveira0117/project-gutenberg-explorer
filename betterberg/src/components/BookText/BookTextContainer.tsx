"use client";

import { Container } from "@mui/material";
import BookText from "./BookText";
import { useEffect, useState } from "react";
import BookTextHeader from "./BookTextHeader";
import { Book } from "@/types";
import { useBook } from "@/hooks/useBook";

type Props = {
  id: string;
}

const BookTextContainer: React.FC<Props> = ({ id }) => {
  const { book, getBook } = useBook();

  useEffect(() => {
    getBook(id);
  }, [id]);

  if (!book) {
    return null;
  }

  return (
    <>
      <BookTextHeader book={book} />
      <Container maxWidth="lg" sx={{ 
        my: 4, 
        backgroundColor: "white", 
        boxShadow: "0.5rem 0.5rem 0.5rem 0.15rem rgba(0,0,0,0.1)",
        borderRadius: 2,
      }}>
        <BookText text={book.book_url || ""} />
      </Container>
    </>
  );
}

export default BookTextContainer;