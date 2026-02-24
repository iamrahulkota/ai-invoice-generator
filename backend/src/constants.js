export const PORT = process.env.PORT || 8000;
export const DB_NAME = "ai-invoice-generator";
export const DB_URL = process.env.MONGODB_URI;
export const BASE_API_URL = process.env.BASE_API_URL;

// JWT secrets
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
