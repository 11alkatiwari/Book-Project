require('dotenv').config(); // Load .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const user = require('./routes/user');
const Book = require('./models/book'); // Import Book model
const book = require ("./routes/book");
const favourites = require ("./routes/favourites");
const cart = require("./routes/cart");
const order = require("./routes/order");
const app = express();

app.use(express.json());
app.use(cors());

// ✅ Check MongoDB Connection String
console.log("MONGO_URI:", process.env.MONGO_URI);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Failed:", err));

// ✅ Add Sample Books (if needed)
app.post("/api/v1/add-sample-books", async (req, res) => {
  const sampleBooks = [
    { title: "Harry Potter", author: "J.K. Rowling", price: "19.99", image: "https://m.media-amazon.com/images/I/81YOuOGFCJL.jpg", category: "Fantasy" },
    { title: "Atomic Habits", author: "James Clear", price: "14.99", image: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg", category: "Self-Help" }
  ];
  try {
    await Book.insertMany(sampleBooks); // Insert sample books into the database

    res.json({ status: "success", message: "Books added successfully!" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to add books." });
  }
});

// ✅ Routes
app.use("/api/v1/userAuth", require("./routes/userAuth"));
app.use("/api/v1", user);
app.use("/api/v1", book);
app.use("/api/v1", favourites);
app.use("/api/v1", cart);
app.use("/api/v1", order);

// ✅ Start Server
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
