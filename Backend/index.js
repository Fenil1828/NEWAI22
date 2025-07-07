const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require('express-session');

// Load environment variables first
dotenv.config();

const app = express();
const authRoutes = require("./routes/authRoutes");
const database = require("./config/database");

// Database connection
database.dbConnect();

// CORS configuration (MUST be before routes)
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? [process.env.FRONTEND_URL, 'https://*.vercel.app'] // Production URLs
        : 'http://localhost:5173', // Development URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json());

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true
// }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: 'lax',
      secure: false, // true if using HTTPS
    },
  })
);



// Routes (after CORS and body parsing)
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Your Server is Up and Running Fantastic"
    });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
