'use client'

import { useState } from "react";
import { TextField, InputAdornment, Box, Skeleton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useDebounced from "@/hooks/useDebounce";
import { useBooks } from "@/hooks/useBooks";

export default function SearchInput() {
  const { setSearchQuery, isLoading } = useBooks();

  const throttledSearch = useDebounced((value: string) => {
    setSearchQuery(value);
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    throttledSearch(event.target.value);
  };

  if (isLoading) {
    return (<Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Skeleton
        variant="rectangular"
        width={400}
        height={56}
        sx={{
          borderRadius: 2,
        }}
      />
    </Box>)
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search..."
        onChange={handleChange}
        sx={{
          maxWidth: 400,
          bgcolor: "white",
          boxShadow: 2,
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#ccc",
            },
            "&:hover fieldset": {
              borderColor: "#999",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#666",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#666" }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
