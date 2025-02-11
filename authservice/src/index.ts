import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import { Passport } from "./config/passport.js";
import { initializeSwagger } from "./config/swagger.js";
import Secrets from "./config/secrets.js";
import { swaggerAuthMiddleware } from "./middlewares/swaggerAuth.middleware.js";
import { accessMiddleware } from "./middlewares/access.middleware.js";

const app = express()

Secrets.initialize()

app.use(cors())
app.use(express.json())

Passport.initialize();

app.use('/api-docs', swaggerAuthMiddleware, ...initializeSwagger())
app.use("/api", accessMiddleware, router);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})