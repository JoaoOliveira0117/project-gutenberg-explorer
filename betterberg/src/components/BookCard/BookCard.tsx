import CardContainer from "../dummies/CardContainer";
import BookCardImage from "./BookCardImage";
import { Box, Button, Grid2 as Grid, Typography } from "@mui/material";
import BookCardTitle from "./BookCardTitle";
import BookCardAuthors from "./BookCardAuthors";
import BookCardChips from "./BookCardChips";
import { FavoriteBorder } from "@mui/icons-material";
import Link from "next/link";
import BookCardReadButton from "./BookCardReadButton";
import BookCardFavoriteButton from "./BookCardFavoriteButton";

type Book = {
  id: string;
  book_id: string;
  title: string;
  authors: string[];
  subjects: string[];
  tags: string[];
  language: string;
}

type Props = {
  book: Book;
}

const BookCard: React.FC<Props> = ({ book }) => {
  return (
    <CardContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box sx={{ width: "25%" }}>
          <BookCardImage
            image={`https://www.gutenberg.org/cache/epub/${book.book_id}/pg${book.book_id}.cover.medium.jpg`}
            alt={book.title}
          />
        </Box>
        <Box sx={{ flexGrow: 5, width: "75%", alignSelf: "stretch", display: "flex", flexDirection: "column", gap: 1 }}>
          <BookCardTitle title={book.title} />
          <BookCardAuthors authors={book.authors} />
          <BookCardChips language={book.language} subjects={book.subjects} tags={book.tags} />
          <Box sx={{ alignSelf: 'end', marginTop: 'auto', paddingTop: '1rem', display: "flex", flexDirection: "row", gap: 1 }}>
            <BookCardFavoriteButton favorite />
            <BookCardReadButton bookId={book.id} />
          </Box>
        </Box>
      </Box>
    </CardContainer>
  );
}

export default BookCard;