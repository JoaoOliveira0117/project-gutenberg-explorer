import { ArrowLeft } from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";
import BookTextChips from "./BookTextChips";
import { Book } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type Props = {
  book: Book;
}

const BookTextHeader: React.FC<Props> = ({ book }) => {
  const router = useRouter()

  if (!book || !book.authors) {
    return null;
  }
  
  const handleBack = () => {
    router.push(`/book`)
  }

  const formattedAuthors = book.authors.map((author, index) => {
    return author
      .replace(/\s*\d{3,4}-\d{3,4}/g, "")
      .replace(/\s*\[Editor\]/g, "")
      .replace(/\?/g, "")
      .replace(/,\s*$/, "")
      .trim(); 
  })

  return (
    <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column", gap: "1rem", my: 4 }}>
      <Button variant={'ghost'} onClick={() => handleBack()}>
        <ArrowLeft />
        Back to books
      </Button>
      <Box maxWidth="32rem" sx={{ alignSelf: "center", marginBottom: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography fontSize={{ md: "2rem" }} variant="h1" sx={{ textAlign: "center" }}>{book.title}</Typography>
        <Typography fontSize={{ md: "1rem" }} variant="h6" sx={{ color: "var(--dark-gray)", textAlign: "center" }}>{formattedAuthors.join(" & ")}</Typography>
        <Box maxWidth="28rem" sx={{ m: 1, textAlign: 'center', height: "fit-content" }}>
          <BookTextChips language={book.language} subjects={book.subjects} tags={book.tags}/>
        </Box>
      </Box>
    </Container>
  );
}

export default BookTextHeader;