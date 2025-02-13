import { Container } from "@mui/material";
import SearchInput from "@/components/SearchBooks";
import BookGrid from "@/components/BookCard/Grid";

export default function Books() {
  return (
    <Container maxWidth="lg">
      <SearchInput />
      <BookGrid />
    </Container>
  );
}
