const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { authenticateToken } = require("./userAuth");

// ✅ Add Book to Cart
router.post("/add-to-cart", async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
      return res.status(400).json({
        success: false,
        message: "❌ userId and bookId are required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "❌ User not found",
      });
    }

    // Check if book already in cart
    const isBookInCart = user.cart.includes(bookId);
    if (isBookInCart) {
      return res.json({
        success: true,
        message: "📚 Book is already in your cart",
      });
    }

    // Add book to cart
    await User.findByIdAndUpdate(userId, { $push: { cart: bookId } });

    return res.json({
      success: true,
      message: "✅ Book added to cart successfully",
    });
  } catch (error) {
    console.error("❌ Error adding to cart:", error);
    return res.status(500).json({
      success: false,
      message: "❌ Internal Server Error",
      error: error.message,
    });
  }
});

// ✅ Remove Book from Cart
router.delete("/remove-from-cart/:bookId", async (req, res) => {
  try {
    const { userId } = req.body; // userId should come from body
    const { bookId } = req.params;

    if (!userId || !bookId) {
      return res.status(400).json({
        success: false,
        message: "❌ userId and bookId are required",
      });
    }

    await User.findByIdAndUpdate(userId, { $pull: { cart: bookId } });

    return res.json({
      success: true,
      message: "🗑️ Book removed from cart successfully",
    });
  } catch (error) {
    console.error("❌ Error removing from cart:", error);
    return res.status(500).json({
      success: false,
      message: "❌ Internal Server Error",
      error: error.message,
    });
  }
});

// ✅ Get User Cart
router.get("/get-user-cart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("cart");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "❌ User not found",
      });
    }

    const cart = user.cart.reverse();

    return res.json({
      success: true,
      message: "🛒 Cart fetched successfully",
      cart,
    });
  } catch (error) {
    console.error("❌ Error fetching cart:", error);
    return res.status(500).json({
      success: false,
      message: "❌ Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
