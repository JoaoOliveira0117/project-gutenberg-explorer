import { Router } from "express";
import errorHandler from "../middlewares/error.middleware.js";

const router = Router();


router.use(errorHandler);

export default router;