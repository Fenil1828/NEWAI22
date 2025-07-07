// Get the API base URL from environment variables or use localhost as fallback
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// In production, this will be set by Vercel environment variables

// AUTH ENDPOINTS
export const endpoints = {
SENDOTP_API : BASE_URL + "/auth/send-otp",
PROFILE_API : BASE_URL + "/auth/register",
LOGIN_API : BASE_URL + "/auth/login"
};