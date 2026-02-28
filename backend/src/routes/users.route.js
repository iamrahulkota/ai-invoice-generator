import { Router } from "express";
const router = Router();

import {
    handleGetUserById,
} from "../controllers/users.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";


router 
    .route("/:DistributorId")
    .get(verifyToken, handleGetUserById)


export { router as usersRoute };