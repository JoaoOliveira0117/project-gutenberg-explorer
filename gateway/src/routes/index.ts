import { Router } from "express";
import errorHandler from "../middlewares/error.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import getMeController from "../controllers/auth/getMe.controller.js";
import getByIdController from "../controllers/auth/getById.controller.js";
import redirectController from "../controllers/auth/redirect.controller.js";
import updateMeController from "../controllers/auth/updateMe.controller.js";
import getAllBooksController from "../controllers/books/getAll.controller.js";
import getBookByIdController from "../controllers/books/getById.controller.js";
import putFavoriteBookController from "../controllers/books/putFavoriteBook.controller.js";
import deleteFavoriteBookController from "../controllers/books/deleteFavoriteBook.controller.js";

const router = Router();

router.get("/redirect", redirectController);

router.use(authMiddleware);

// Auth service routes
router.get("/user/me", getMeController);
router.put("/user/me", updateMeController);
router.get("/user/:id", getByIdController);

// Books service routes
router.get("/books", getAllBooksController);
router.get("/books/:id", getBookByIdController);
router.put("/books/:id/favorite", putFavoriteBookController);
router.delete("/books/:id/favorite", deleteFavoriteBookController);

router.use(errorHandler);

export default router;