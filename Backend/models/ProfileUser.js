const mongoose = require("mongoose");

const ProfileUser = new mongoose.Schema({
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, trim: true }, // Not required for Google users
    googleId: { type: String, unique: true, sparse: true },
    picture: { type: String },
    image: { type: String }, // This is your main avatar field
    createdAt: { type: Date, default: Date.now },
    avatar: String,
});

module.exports = mongoose.model("ProfileUser", ProfileUser);
