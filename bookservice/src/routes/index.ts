import { Router } from "express";
import getAll from "../controllers/books/getAll.js";
import getById from "../controllers/books/getById.js";
import { getAllValidation, getByIdValidation } from "../validation/books.validation.js";
import validate from "../middlewares/validation.middleware.js";

const router = Router();

const bookRouter = Router();

bookRouter.get("/", validate(getAllValidation), getAll)
bookRouter.get("/:id", validate(getByIdValidation), getById)

router.use("/books", bookRouter)

export default router;