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
    .get(handleGetAllShops)
    .post(handleCreateShop);

// getting, updating, or deleting a specific shop by ID
router
    .route("/:shopId")
    .get(handleGetShopById)
    .put(handleUpdateShop)
    .delete(handleDeleteShop);

export { router as shopsRoute };