const express = require("express")
const { sendOtp, verifyOtp, register, googleAuthUrl, googleCallback, getMe, login } = require("../controllers/Auth")
const { auth } = require("../middleware/auth")
const router  = express.Router()


router.post("/send-otp" , sendOtp)
router.post("/verify-otp" , verifyOtp)
router.post("/register" , register)

router.post("/login" , login)

router.get("/google/url" , googleAuthUrl)
router.get("/google/callback" , googleCallback)
router.get("/me", getMe);

module.exports = router;