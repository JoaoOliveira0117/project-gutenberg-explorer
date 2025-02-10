import { Router } from "express";
import validate from "../middlewares/validation.middleware.js";
import { passportCallbackMiddleware, passportMiddleware } from "../middlewares/passport.middleware.js";
import { callbackValidation, getByIdValidation, redirectValidation, updateMeValidation } from "../validation/auth.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import redirectController from "../controllers/redirect.controller.js";
import callbackController from "../controllers/callback.controller.js";
import getMeController from "../controllers/getMe.controller.js";
import getByIdController from "../controllers/getById.controller.js";
import updateMeController from "../controllers/updateMe.controller.js";
import errorHandler from "../middlewares/error.middleware.js";

const router = Router();

router.get('/google/redirect', validate(redirectValidation), passportMiddleware, redirectController);
router.get('/google/callback', validate(callbackValidation), passportCallbackMiddleware, callbackController);

router.get('/user/me', authMiddleware, getMeController)
router.put('/user/me', authMiddleware, validate(updateMeValidation), updateMeController)
router.get('/user/:id', authMiddleware, validate(getByIdValidation), getByIdController)

router.use(errorHandler);

export default router;