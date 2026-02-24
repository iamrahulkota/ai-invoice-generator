import { Router } from "express";
import {
  register,
  login,
  refreshToken,
  logout,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register",      register);
router.post("/login",         login);
router.post("/refresh-token", refreshToken);
router.post("/logout",        verifyToken, logout); // protected — needs valid access token

export {router as authRoute };