import express from "express";
import cors from "cors";
import { getAllBooks } from "./controllers/getAllBooks.js";
import { getBookById } from "./controllers/getBookById.js";

const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  const books = await getAllBooks();
  res.json(books);
});

app.get("/:id", async (req, res) => {
  const book = await getBookById(Number(req.params.id));
  res.json(book);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})