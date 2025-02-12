'use client'

import { Grid2 as Grid } from "@mui/material";
import BookCard from "./BookCard";
import { useBooks } from "@/hooks/useBooks";
import BookCardSkeleton from "./BookCardSkeleton";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getAllBooks } from "@/services/booksApi";
import NewBookCard from "../newBookCard";

type Props = {}

const BookCardGrid: React.FC<Props> = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();
  const { books, isLoading, isFetching, searchQuery, setBooks } = useBooks();

  const fetchBooks = useCallback(async () => {
    if (isFetching || isLoading) return;
    
    const newBooks = await getAllBooks(searchQuery, page, 25)

    setPage(prevPage => prevPage + 1);
    setBooks(prevBooks => [...prevBooks,...newBooks]);
    setHasMore(newBooks.length === 25);
  }, [books.length, isLoading, isFetching, hasMore, page, getAllBooks]);

  useEffect(() => {
    if (inView)  {
      fetchBooks()
    };
  }, [books, inView, fetchBooks])

  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [searchQuery]);

  console.log(hasMore)

  return (
    <Grid container spacing={{ xs: 1, md: 2 }} justifyContent="center" sx={{ mx: "auto", p: 1 }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {books.map((book) => (
          <NewBookCard key={book.id} book={book} onToggleFavorite={console.log} />
        ))}
      </div>
    </Grid>
  );
}

export default BookCardGrid;