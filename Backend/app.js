require('dotenv').config(); // Load .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const user = require('./routes/user');
const book = require('./routes/book');
const favourites = require('./routes/favourites');
const cart = require('./routes/cart');
const order = require('./routes/order');

const app = express();

app.use(express.json());
app.use(cors());

// ✅ Check MongoDB Connection String
console.log("MONGO_URI:", process.env.MONGO_URI);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Failed:", err));

// ✅ Routes
app.use("/api/v1/userAuth", require("./routes/userAuth"));
app.use("/api/v1", user);
app.use("/api/v1", book);
app.use("/api/v1", favourites);
app.use("/api/v1", cart);
app.use("/api/v1", order);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
