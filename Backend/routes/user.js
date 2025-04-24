const express = require("express");
const router = express.Router(); 
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/sign-up", async (req, res) => {
    try {
        console.log(" Signup Request Received:", req.body);

        const { username, email, password, address } = req.body;

        if (!username || !email || !password || !address) {
            return res.status(400).json({ message: "❌ All fields are required!" });
        }

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "❌ Username or Email already exists. Try another!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword, address });
        await newUser.save();

        console.log("✅ User Saved Successfully:", newUser);
        return res.status(201).json({ message: "✅ Signup successful!" });

    } catch (error) {
        console.error("❌ Signup Error:", error);
        return res.status(500).json({ message: "❌ Internal server error", error: error.message });
    }
});

module.exports = router; 
