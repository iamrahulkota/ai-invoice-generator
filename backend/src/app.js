import express from "express";
import cors from "cors";
import { shopsRoute } from "./routes/shops.route.js";
import { authRoute } from "./routes/auth.route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/auth", authRoute);
app.use("/api/v1/shops", shopsRoute);



export { app };