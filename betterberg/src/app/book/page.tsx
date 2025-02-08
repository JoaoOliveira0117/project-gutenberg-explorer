'use client'

import { useEffect, useState } from "react";
import { Grid2 as Grid, Typography, Card, CardMedia, Autocomplete, TextField, Container, Link } from "@mui/material";

export default function Books() {
  const [books, setBooks] = useState([] as any)
  const [search, setSearch] = useState("")
  
  useEffect(() => {
    fetch("/api/user").then((res) => res.json()).then((data) => console.log(data))

    fetch("/api/books?search=" + search)
      .then(res => res.json())
      .then(data => setBooks(data.result.data))
  }, [search])

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Betterberg
      </Typography>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={[]}
        onChange={(e, value) => setSearch(value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "white", // Cor do texto digitado
            "& fieldset": { borderColor: "white" }, // Cor da borda
            "&:hover fieldset": { borderColor: "white" }, // Cor da borda ao passar o mouse
            "&.Mui-focused fieldset": { borderColor: "white" }, // Cor da borda quando focado
          },
          "& .MuiInputLabel-root": { color: "white" }, // Cor do label
          "& .MuiInputLabel-root.Mui-focused": { color: "white" }, // Cor do label ao focar
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
      />
      <Grid container spacing={{ sm: 3, md: 4 }} justifyContent="center" sx={{ mx: "auto", p: 2 }}>
        {books.map((book: any) => (
          <Grid key={book.id} size={{ xs: 6, sm: 4, md: 3 }}>
            <Link href={'/book/' + book.book_id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", p: 1 }}>
                <CardMedia
                  component="img"
                  image={`https://www.gutenberg.org/cache/epub/${book.book_id}/pg${book.book_id}.cover.medium.jpg`}
                  alt={book.title}
                  sx={{
                    width: "100%",
                    aspectRatio: "2 / 3",
                    objectFit: "contain",
                    backgroundColor: "#f0f0f0",
                    borderRadius: 1,
                  }}
                />
                <Typography variant="body2" align="center" sx={{ mt: 1, height: "fit" ,textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%" }}>
                  {book.title}
                </Typography>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
