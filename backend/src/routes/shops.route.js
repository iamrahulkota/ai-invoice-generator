import { Router } from "express";
const router = Router();

import {
    handleGetAllShops,
    handleGetShopById,
    handleCreateShop,
    handleUpdateShop,
    handleDeleteShop
} from "../controllers/shops.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

// getting a list of shops
router
    .route("/")
    .get(verifyToken, handleGetAllShops)
    .post(verifyToken, handleCreateShop);

// getting, updating, or deleting a specific shop by ID
router
    .route("/:shopId")
    .get(verifyToken, handleGetShopById)
    .put(verifyToken, handleUpdateShop)
    .delete(verifyToken, handleDeleteShop);

export { router as shopsRoute };