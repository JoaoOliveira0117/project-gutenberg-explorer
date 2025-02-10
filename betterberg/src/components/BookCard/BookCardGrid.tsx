'use client'

import { Grid2 as Grid } from "@mui/material";
import BookCard from "./BookCard";
import { useBooks } from "@/hooks/useBooks";
import BookCardSkeleton from "./BookCardSkeleton";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getAllBooks } from "@/services/booksApi";

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
      {
        isLoading && books.length === 0 && Array.from({ length: 12 }).map((_, index) => (
          <Grid key={index} size={{ xs: 8, sm: 6, md: 4 }}>
            <BookCardSkeleton />
          </Grid>
        ))
      }
      {
        !isLoading && books.map((book: any) => (
          <Grid key={book.id} size={{ xs: 8, sm: 6, md: 4 }}>
            <BookCard book={book} />
          </Grid>
        ))
      }
      {
        !isLoading && isFetching && books.length > 0 && Array.from({ length: 4 }).map((_, index) => (
          <Grid key={index} size={{ xs: 8, sm: 6, md: 4 }}>
            <BookCardSkeleton />
          </Grid>
        ))
      }
      {
        !isFetching && hasMore && <div ref={ref}></div>
      }
    </Grid>
  );
}

export default BookCardGrid;