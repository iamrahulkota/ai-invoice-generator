import express from "express";
import { shopsRoute } from "./routes/shops.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/shops", shopsRoute);



export { app };