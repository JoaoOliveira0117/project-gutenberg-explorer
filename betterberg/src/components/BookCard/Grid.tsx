'use client'

import { useRouter } from 'next/navigation'
import { Grid2 as Grid } from "@mui/material";
import { useBooks } from "@/hooks/useBooks";
import Card from "./Card";

type Props = {}

const BookCardGrid: React.FC<Props> = () => {
  const { books } = useBooks();
  const router = useRouter()

  const handleToggleFavorite = (id: string, callback: (v: boolean) => void) => {
    console.log(id, callback)
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