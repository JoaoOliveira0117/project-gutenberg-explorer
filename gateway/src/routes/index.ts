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
import getBookAnalysis from "../controllers/books/getBookAnalysis.controller.js";
import getAllFavoritesController from "../controllers/books/getAllFavorites.controller.js";
import getAllLastSeenController from "../controllers/books/getAllLastSeen.controller.js";

const router = Router();

router.get('/health', (req, res) => {
  res.json('OK');
})

router.get("/redirect", redirectController);

router.use(authMiddleware);

// Auth service routes
router.get("/user/me", getMeController);
router.put("/user/me", updateMeController);
router.get("/user/:id", getByIdController);

// Books service routes
router.get("/books", getAllBooksController);
router.get("/books/favorites", getAllFavoritesController);
router.get("/books/last-seen", getAllLastSeenController);
router.get("/books/:id", getBookByIdController);
router.get("/books/:id/ai/:type", getBookAnalysis);
router.put("/books/:id/favorite", putFavoriteBookController);
router.delete("/books/:id/favorite", deleteFavoriteBookController);

router.use(errorHandler);

export default router;