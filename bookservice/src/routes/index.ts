import { Router } from "express";
import getAll from "../controllers/books/getAll.js";
import getById from "../controllers/books/getById.js";
import { getAllValidation, getByIdValidation, postFavoriteBookValidation, postLastSeenBookValidation } from "../validation/books.validation.js";
import validate from "../middlewares/validation.middleware.js";
import postFavoriteBook from "../controllers/favorites/postFavoriteBook.js";
import postLastSeenBook from "../controllers/lastseen/postLastSeenBook.js";

const router = Router();
const bookRouter = Router();
const favoriteRouter = Router();
const lastSeenRouter = Router();

bookRouter.get("/", validate(getAllValidation), getAll)
bookRouter.get("/:id", validate(getByIdValidation), getById)

favoriteRouter.post("/:book_id/favorite", validate(postFavoriteBookValidation), postFavoriteBook)
lastSeenRouter.post("/:book_id/last-seen", validate(postLastSeenBookValidation), postLastSeenBook)

bookRouter.use("/", favoriteRouter);
bookRouter.use("/", lastSeenRouter);
router.use("/books", bookRouter)

export default router;