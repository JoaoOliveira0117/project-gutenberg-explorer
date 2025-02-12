"use client";

import { Container } from "@mui/material";
import BookText from "./BookText";
import { useEffect, useState } from "react";
import BookTextHeader from "./BookTextHeader";
import { Book } from "@/types";

type Props = {
  id: string;
}

const BookTextContainer: React.FC<Props> = ({ id }) => {
  const [bookData, setBookData] = useState<Book>({} as Book);
  const [bookText, setBookText] = useState("");

  const fetchBook = () => {
    fetch(`/api/books/${id}`).then(console.log)
  }

  useEffect(() => {
    fetchBook();
  }, [id]);

  return (
    <>
      <BookTextHeader book={bookData} />
      <Container maxWidth="lg" sx={{ 
        my: 4, 
        backgroundColor: "white", 
        boxShadow: "0.5rem 0.5rem 0.5rem 0.15rem rgba(0,0,0,0.1)",
        borderRadius: 2,
      }}>
        <BookText text={bookText} />
      </Container>
    </>
  );
}

export default BookTextContainer;