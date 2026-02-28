import jwt from "jsonwebtoken";
import { Distributor } from "../models/distributor.model.js";
import { ACCESS_TOKEN_SECRET } from "../constants.js";   // ← import from constants

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("1. Auth Header:", authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                meta: { status: 401, message: "Access token missing" }
            });
        }

        const token = authHeader.split(" ")[1];

        let decoded;
        try {
            decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        } catch (err) {
            const message = err.name === "TokenExpiredError"
                ? "Access token expired"
                : "Invalid access token";
            return res.status(401).json({
                meta: { status: 401, message }
            });
        }

        const distributor = await Distributor.findById(decoded.id).select("-password -token");

        if (!distributor || !distributor.is_active) {
            return res.status(401).json({
                meta: { status: 401, message: "Account not found or inactive" }
            });
        }

        req.distributor = distributor;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(500).json({
            meta: { status: 500, message: "Internal server error" }
        });
    }
};