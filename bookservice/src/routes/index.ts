import { Router } from "express";
import validate from "../middlewares/validation.middleware.js";
import { deleteFavoriteBookValidation, getAllFavoritesValidation, getAllLastSeenValidation, getAllValidation, getByIdValidation, postFavoriteBookValidation, postLastSeenBookValidation, aiValidation, userValidation } from "../validation/books.validation.js";
import getAllController from "../controllers/books/getAll.controller.js";
import getByIdController from "../controllers/books/getById.controller.js";
import putFavoriteBookController from "../controllers/favorites/putFavoriteBook.controller.js";
import deleteFavoriteBookController from "../controllers/favorites/deleteFavoriteBook.controller.js";
import putLastSeenController from "../controllers/lastseen/putLastSeen.controller.js";
import errorHandler from "../middlewares/error.middleware.js";
import getAllLastSeenController from "../controllers/books/getAllLastSeen.controller.js";
import getAllFavoritesController from "../controllers/books/getAllFavorites.controller.js";
import aiByBookId from "../controllers/books/ai.controller.js";

const router = Router();
const bookRouter = Router({ mergeParams: true });
const aiRouter = Router({ mergeParams: true });
const favoriteRouter = Router({ mergeParams: true });
const lastSeenRouter = Router({ mergeParams: true });

router.get('/health', (req, res) => {
  res.json('OK');
})

bookRouter.get("/", validate(getAllValidation), getAllController)
bookRouter.get("/favorites", validate(getAllFavoritesValidation), getAllFavoritesController)
bookRouter.get("/last-seen", validate(getAllLastSeenValidation), getAllLastSeenController)
bookRouter.get("/:id", validate(getByIdValidation), getByIdController)

favoriteRouter.put("/favorite", validate(postFavoriteBookValidation), putFavoriteBookController)
favoriteRouter.delete("/favorite", validate(deleteFavoriteBookValidation), deleteFavoriteBookController)
lastSeenRouter.put("/last-seen", validate(postLastSeenBookValidation), putLastSeenController)

aiRouter.get("/ai/:type", validate(aiValidation), aiByBookId);

bookRouter.use("/:book_id", favoriteRouter);
bookRouter.use("/:book_id", lastSeenRouter);
bookRouter.use("/:book_id", aiRouter);

router.use("/:user_id/books", validate(userValidation), bookRouter)

router.use(errorHandler);

export default router;