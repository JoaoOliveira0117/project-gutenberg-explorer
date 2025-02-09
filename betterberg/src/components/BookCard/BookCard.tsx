import CardContainer from "../dummies/CardContainer";
import BookCardImage from "./BookCardImage";
import { Box } from "@mui/material";
import BookCardTitle from "./BookCardTitle";
import BookCardAuthors from "./BookCardAuthors";
import BookCardChips from "./BookCardChips";
import BookCardReadButton from "./BookCardReadButton";
import BookCardFavoriteButton from "./BookCardFavoriteButton";
import { Book } from "@/types";

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
            <BookCardFavoriteButton id={book.id} favorite={!!book.user_favorite_books} />
            <BookCardReadButton bookId={book.id} />
          </Box>
        </Box>
      </Box>
    </CardContainer>
  );
}

export default BookCard;