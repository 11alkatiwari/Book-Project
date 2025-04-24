import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import Allbook from "./pages/Allbook";
import Login from "./pages/Login";
import Sign from "./pages/Sign";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./Components/viewbook/ViewBookDetails";
import AddBook from "./pages/AddBook";
import axios from "axios";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";

const App = () => {
  const [books, setBooks] = useState([]);

  // ✅ Fetch books from backend
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/get-all-books");
      setBooks(response.data.data);
    } catch (error) {
      console.error("❌ Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks(); // Load books when app starts
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Allbook" element={<Allbook books={books} refreshBooks={fetchBooks} />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Sign" element={<Sign />} />
        <Route path="/AddBook" element={<AddBook refreshBooks={fetchBooks} />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Policy" element={<Policy />} />
      </Routes>
      <Footer />
      </>
  );
};

export default App;
