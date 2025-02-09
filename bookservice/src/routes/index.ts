import { Router } from "express";
import getAll from "../controllers/books/getAll.js";
import getById from "../controllers/books/getById.js";
import { deleteFavoriteBookValidation, getAllValidation, getByIdValidation, postFavoriteBookValidation, postLastSeenBookValidation } from "../validation/books.validation.js";
import validate from "../middlewares/validation.middleware.js";
import postFavoriteBook from "../controllers/favorites/postFavoriteBook.js";
import postLastSeenBook from "../controllers/lastseen/postLastSeenBook.js";
import deleteFavoriteBook from "../controllers/favorites/deleteFavoriteBook.js";

const router = Router();
const bookRouter = Router();
const favoriteRouter = Router();
const lastSeenRouter = Router();

bookRouter.get("/", validate(getAllValidation), getAll)
bookRouter.get("/:id", validate(getByIdValidation), getById)

favoriteRouter.put("/:book_id/:user_id/favorite", validate(postFavoriteBookValidation), postFavoriteBook)
favoriteRouter.delete("/:book_id/:user_id/favorite", validate(deleteFavoriteBookValidation), deleteFavoriteBook)
lastSeenRouter.post("/:book_id/:user_id/last-seen", validate(postLastSeenBookValidation), postLastSeenBook)

bookRouter.use("/", favoriteRouter);
bookRouter.use("/", lastSeenRouter);
router.use("/books", bookRouter)

export default router;