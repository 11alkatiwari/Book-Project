const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ SIGNUP
router.post("/sign-up", async (req, res) => {
  try {
    console.log("Signup Request:", req.body);

    const { username, email, password, address, mobile, gender } = req.body;

    if (!username || !email || !password || !address || !mobile) {
      return res.status(400).json({ message: "❌ All fields are required!" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "❌ Username or Email already exists. Try another!" });
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      address,
      mobile,
      gender,
      password,
    });

    await newUser.save();

    console.log("✅ User Saved Successfully:", newUser);
    return res
      .status(201)
      .json({ success: true, message: "✅ Signup successful!" });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: "❌ Internal server error",
      error: error.message,
    });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return clean user data (no password)
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      address: user.address,
      mobile: user.mobile,
      gender: user.gender,
    };

    return res.status(200).json({
      success: true,
      message: "✅ Login successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "❌ Internal server error",
      error: error.message,
    });
  }
});

module.exports = router;
