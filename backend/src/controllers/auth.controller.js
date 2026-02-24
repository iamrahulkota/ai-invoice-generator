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

        // 1. Check duplicate email
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

        // 2. Hash password
        const password_hash = await bcrypt.hash(password, 12);

        // 3. Create distributor with business profile in one shot
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
                email: distributor.email
            },
        });
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({
            meta: {
                status: 500,
                message: "Server error",
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

        // 1. Find user
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

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, distributor.password);
        if (!isMatch) {
            return res.status(401).json({
                meta: {
                    status: 401,
                    message: "Invalid email or password",
                },
            });
        }

        // 3. Generate tokens
        const accessToken = generateAccessToken(distributor._id);
        const refreshToken = generateRefreshToken(distributor._id);

        // 4. Store refresh token in DB + update last_login
        distributor.refresh_tokens.push(refreshToken);
        distributor.last_login = new Date();
        await distributor.save();

        // 5. Set refresh token as httpOnly cookie
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
                message: "Server error",
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

        // 1. Verify the refresh token
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

        // 2. Check token exists in DB (rotation check)
        const distributor = await Distributor.findById(decoded.id);
        if (!distributor || !distributor.refresh_tokens.includes(token)) {
            return res.status(403).json({
                meta: {
                    status: 403,
                    message: "Refresh token revoked",
                },
            });
        }

        // 3. Rotate: remove old, issue new
        distributor.refresh_tokens = distributor.refresh_tokens.filter((t) => t !== token);
        const newRefreshToken = generateRefreshToken(distributor._id);
        distributor.refresh_tokens.push(newRefreshToken);
        await distributor.save();

        const newAccessToken = generateAccessToken(distributor._id);
        setRefreshTokenCookie(res, newRefreshToken);

        return res.status(200).json({
            meta: {
                status: 200,
                message: "Token refreshed successfully",
            },
            data: {
                accessToken: newAccessToken
            },
        });
    } catch (error) {
        console.error("Refresh token error:", error);
        return res.status(500).json({
            meta: {
                status: 500,
                message: "Server error",
            },
            error: error.message,
        });
    }
};

// ── POST /api/v1/auth/logout ─────────────────────────────
export const logout = async (req, res) => {
    try {
        const token = req.cookies?.refreshToken;

        if (token) {
            // Remove this specific refresh token from DB (single device logout)
            await Distributor.findByIdAndUpdate(req.distributor.id, {
                $pull: {
                    refresh_tokens: token
                },
            });
        }

        // Clear the cookie
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
                message: "Server error",
            },
            error: error.message,
        });
    }
};