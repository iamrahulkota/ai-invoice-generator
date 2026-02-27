import { Router } from "express";
const router = Router();

import {
    handleGetUserById,
} from "../controllers/users.controller.js";


router 
    .route("/:DistributorId")
    .get(handleGetUserById)


export { router as usersRoute };