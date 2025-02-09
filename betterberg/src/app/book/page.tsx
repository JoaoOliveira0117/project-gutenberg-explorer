'use client'

import { useEffect, useState } from "react";
import { Grid2 as Grid, Typography, Card, CardMedia, Autocomplete, TextField, Container, Link, CardContent, IconButton } from "@mui/material";
import UserPill from "@/components/UserPill";
import BookCard from "@/components/BookCard";
import SearchInput from "@/components/SearchBooks";

export default function Books() {
  const [books, setBooks] = useState([] as any)
  const [user, setUser] = useState(null as any)
  const [search, setSearch] = useState("")
  
  useEffect(() => {
    fetch("/api/user").then((res) => res.json()).then((data) => setUser(data.result))

    fetch("/api/books?search=" + search)
      .then(res => res.json())
      .then(data => setBooks(data.result.data))
  }, [search])

  return (
    <Container maxWidth="lg">
      <Container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Betterberg
        </Typography>
        { user && <UserPill email={user.email} onLogout={console.log}/> }
      </Container>
      <SearchInput onSearch={setSearch}/>
      <Grid container spacing={{ xs: 1, md: 2 }} justifyContent="center" sx={{ mx: "auto", p: 1 }}>
        {books.map((book: any) => (
          <Grid key={book.id} size={{ xs: 8, sm: 6, md: 4 }}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
