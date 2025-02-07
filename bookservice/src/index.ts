import express from "express";
import { getAllBooks } from "./controllers/getAllBooks.js";

const app = express()

app.use(express.json())

const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  const books = await getAllBooks();
  res.json(books);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})