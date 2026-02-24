import express from "express";
import { shopsRoute } from "./routes/shops.route.js";
import { authRoute } from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/shops", shopsRoute);
app.use("/api/v1/auth", authRoute);



export { app };