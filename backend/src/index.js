import dotenv from 'dotenv';
import { connectDB } from './db/index.js';
import { PORT } from './constants.js';
import { app } from './app.js';

dotenv.config({
    path: './env'
});


connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error("MONGO DB CONNECTION FAILED !!! ", err);
});
