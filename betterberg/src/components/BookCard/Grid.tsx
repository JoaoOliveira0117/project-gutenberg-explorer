'use client'

import { useRouter } from 'next/navigation'
import { Grid2 as Grid } from "@mui/material";
import { useBooks } from "@/hooks/useBooks";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getAllBooks } from "@/services/booksApi";
import Card from "./Card";

type Props = {}

const BookCardGrid: React.FC<Props> = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();
  const { books, isLoading, isFetching, searchQuery, setBooks, setFavorite } = useBooks();
  const router = useRouter()

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

  const handleToggleFavorite = (id: string, callback: (v: boolean) => void) => {
    setFavorite(id, callback)
  }

  const handleReadBook = (id: string) => {
    router.push(`/book/${id}`)
  }


  return (
    <Grid container spacing={{ xs: 1, md: 2 }} justifyContent="center" sx={{ mx: "auto", p: 1 }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {books.map((book) => (
          <Card key={book.id} book={book} onToggleFavorite={handleToggleFavorite} onClickRead={handleReadBook} />
        ))}
      </div>
    </Grid>
  );
}

export default BookCardGrid;