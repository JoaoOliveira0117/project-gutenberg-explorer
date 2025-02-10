import { Grid2 as Grid, Container } from "@mui/material";
import SearchInput from "@/components/SearchBooks";
import BookCardGrid from "@/components/BookCard/BookCardGrid";

export default function Books() {
  return (
    <Container maxWidth="lg">
      <SearchInput />
      <BookCardGrid />
    </Container>
  );
}
