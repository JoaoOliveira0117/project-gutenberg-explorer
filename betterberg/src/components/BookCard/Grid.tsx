'use client'

import { useRouter } from 'next/navigation'
import { Grid2 as Grid } from "@mui/material";
import { useBooks } from "@/hooks/useBooks";
import Card from "./Card";
import { Book } from '@/types';

type Props = {
  books: Book[];
}

const BookCardGrid: React.FC<Props> = ({ books }: Props) => {
  const router = useRouter()

  const handleToggleFavorite = (id: string, callback: (v: boolean) => void) => {
    console.log(id, callback)
  }

  const handleReadBook = (id: string) => {
    router.push(`/books/${id}`)
  }

  return (
    <Grid container spacing={{ xs: 1, md: 2 }} justifyContent="center" sx={{ mx: "auto", p: 1 }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {books.map((book, i) => (
          <Card key={`${book.id}-${i}`} book={book} onToggleFavorite={handleToggleFavorite} onClickRead={handleReadBook} />
        ))}
      </div>
    </Grid>
  );
}

export default BookCardGrid;