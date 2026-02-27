import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../constants.js";

export const generateAccessToken = (userId, emailId, ownerName) => {
  return jwt.sign({ id: userId, email: emailId, name: ownerName }, ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

export const generateRefreshToken = (userId, emailId, ownerName) => {
  return jwt.sign({ id: userId, email: emailId, name: ownerName }, REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

export const setRefreshTokenCookie = (res, token) => {
  res.cookie("refreshToken", token, {
    httpOnly: true,       // not accessible via JS — prevents XSS
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
  });
};