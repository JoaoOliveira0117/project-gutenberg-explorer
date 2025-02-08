import { Router } from "express";
import getAll from "../controllers/books/getAll.js";
import getById from "../controllers/books/getById.js";

const router = Router();

const bookRouter = Router();

bookRouter.get("/", getAll)
bookRouter.get("/:id", getById)

router.use("/books", bookRouter)

export default router;