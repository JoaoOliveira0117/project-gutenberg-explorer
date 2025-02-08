import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import { Passport } from "./config/passport.js";

const app = express()

app.use(cors())
app.use(express.json())

Passport.initialize();

app.use("/api", router);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})