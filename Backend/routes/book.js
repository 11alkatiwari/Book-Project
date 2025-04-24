const express = require("express");
const router = express.Router(); 
const Book = require("../models/book"); 

router.post("/Addbook", async (req, res) => {
  try {
      console.log("📌 Request received:", req.body); 

      const book = new Book({
          title: req.body.title,
          author: req.body.author,
          image: req.body.image, 
          price: req.body.price,
          category: req.body.category
      });

      await book.save();
      console.log("✅ Book saved:", book);
      return res.status(201).json({ message: "✅ Book added successfully!", data: book });

  } catch (error) {
      console.error("❌ Error adding book:", error);
      return res.status(500).json({ message: "❌ Internal server error.", error: error.message });
  }
});

module.exports = router;
