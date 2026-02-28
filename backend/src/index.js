import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { connectDB } from "./db/index.js";
import { PORT } from "./constants.js";
import { app } from "./app.js";

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error("MONGO DB CONNECTION FAILED !!! ", error);
});
