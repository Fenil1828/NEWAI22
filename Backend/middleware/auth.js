const jwt = require("jsonwebtoken");
require("dotenv").config();

// Auth middleware
exports.auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    let token = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.body?.token) {
      token = req.body.token;
    }

    console.log("Extracted JWT token:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing. Please log in.",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log("Decoded JWT payload:", decoded);
    } catch (err) {
      console.error("JWT verification failed:", err);
      return res.status(401).json({
        success: false,
        message: "Token invalid or malformed.",
      });
    }

    next();
  } catch (err) {
    console.error("Middleware error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during token validation.",
    });
  }
};