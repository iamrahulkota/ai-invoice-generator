import jwt from "jsonwebtoken";
import { Distributor } from "../models/distributor.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    // 1. Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    // 2. Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      const message =
        err.name === "TokenExpiredError"
          ? "Access token expired"
          : "Invalid access token";
      return res.status(401).json({ success: false, message });
    }

    // 3. Attach distributor to request
    const distributor = await Distributor.findById(decoded.id).select(
      "-password -refresh_tokens"
    );
    if (!distributor || !distributor.is_active) {
      return res.status(401).json({ success: false, message: "Account not found or inactive" });
    }

    req.distributor = distributor;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};