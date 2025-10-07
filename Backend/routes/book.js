const express = require("express");
const router = express.Router();
const Book = require("../models/book");

// 📌 Add a new book
router.post("/Addbook", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: newBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add book",
      error: error.message,
    });
  }
});

// 📌 Get all books
router.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch books",
      error: error.message,
    });
  }
});

// 📌 Get book by ID
router.get("/get-book-by-id/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch book",
      error: error.message,
    });
  }
});

module.exports = router;
