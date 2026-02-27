import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
    Distributor
} from "../models/distributor.model.js";
import {
    generateAccessToken,
    generateRefreshToken,
    setRefreshTokenCookie,
} from "../utils/generateTokens.js";

// ── POST /api/v1/auth/register ───────────────────────────
export const register = async (req, res) => {
    try {
        const {
            email,
            password,
            business_name,
            owner_name,
            business_email,
            contact_number,
            gstin,
            pan_number,
            invoice_prefix,
            address,
            bank_details,
        } = req.body;

        const existing = await Distributor.findOne({
            email
        });
        if (existing) {
            return res.status(409).json({
                meta: {
                    status: 409,
                    message: "An account with this email already exists",
                },
            });
        }

        const password_hash = await bcrypt.hash(password, 12);

        const distributor = await Distributor.create({
            email,
            password: password_hash,
            business_profile: {
                business_name,
                owner_name,
                business_email: business_email || email,
                contact_number,
                gstin: gstin || null,
                pan_number: pan_number || null,
                invoice_prefix: invoice_prefix || "INV-",
                address: address || {},
                bank_details: bank_details || {},
            },
        });

        return res.status(201).json({
            meta: {
                status: 201,
                message: "Account created successfully. Please log in.",
            },
            data: {
                id: distributor._id,
                email: distributor.email,
            },
        });
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({
            meta: {
                status: 500,
                message: "Internal server error",
            },
            error: error.message,
        });
    }
};

// ── POST /api/v1/auth/login ──────────────────────────────
export const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const distributor = await Distributor.findOne({
            email
        });
        if (!distributor) {
            return res.status(401).json({
                meta: {
                    status: 401,
                    message: "Invalid email or password",
                },
            });
        }

        const isMatch = await bcrypt.compare(password, distributor.password);
        if (!isMatch) {
            return res.status(401).json({
                meta: {
                    status: 401,
                    message: "Invalid email or password",
                },
            });
        }

        const accessToken = generateAccessToken(
            distributor._id,
            distributor.email,
            distributor.business_profile.owner_name
        );
        const refreshToken = generateRefreshToken(
            distributor._id,
            distributor.email,
            distributor.business_profile.owner_name
        );

        distributor.token = refreshToken;
        distributor.last_login = new Date();
        await distributor.save();

        setRefreshTokenCookie(res, refreshToken);

        return res.status(200).json({
            meta: {
                status: 200,
                message: "Login successful",
            },
            data: distributor,
            // data: {
            //     accessToken,
            //     distributor: {
            //         id: distributor._id,
            //         email: distributor.email,
            //         business_profile: distributor.business_profile,
            //     },
            // },
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            meta: {
                status: 500,
                message: "Internal server error",
            },
            error: error.message,
        });
    }
};

// ── POST /api/v1/auth/refresh-token ─────────────────────
export const refreshToken = async (req, res) => {
    try {
        const token = req.cookies?.refreshToken;
        if (!token) {
            return res.status(401).json({
                meta: {
                    status: 401,
                    message: "No refresh token",
                },
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        } catch {
            return res.status(403).json({
                meta: {
                    status: 403,
                    message: "Invalid or expired refresh token",
                },
            });
        }

        const distributor = await Distributor.findById(decoded.id);
        if (!distributor || distributor.token !== token) {
            return res.status(403).json({
                meta: {
                    status: 403,
                    message: "Refresh token revoked",
                },
            });
        }

        const newRefreshToken = generateRefreshToken(
            distributor._id,
            distributor.email,
            distributor.business_profile.owner_name
        );
        distributor.token = newRefreshToken;
        await distributor.save();

        const newAccessToken = generateAccessToken(
            distributor._id,
            distributor.email,
            distributor.business_profile.owner_name
        );
        setRefreshTokenCookie(res, newRefreshToken);

        return res.status(200).json({
            meta: {
                status: 200,
                message: "Token refreshed successfully",
            },
            data: {
                accessToken: newAccessToken,
            },
        });
    } catch (error) {
        console.error("Refresh token error:", error);
        return res.status(500).json({
            meta: {
                status: 500,
                message: "Internal server error",
            },
            error: error.message,
        });
    }
};

// ── POST /api/v1/auth/logout ─────────────────────────────
export const logout = async (req, res) => {
    try {
        await Distributor.findByIdAndUpdate(req.distributor.id, {
            $set: {
                token: null
            },
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({
            meta: {
                status: 200,
                message: "Logged out successfully",
            },
        });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            meta: {
                status: 500,
                message: "Internal server error",
            },
            error: error.message,
        });
    }
};