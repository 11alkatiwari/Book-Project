import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchBooks } from "./store/booksSlice";
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
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks()); // Load books when app starts
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Allbook" element={<Allbook />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Sign" element={<Sign />} />
        <Route path="/AddBook" element={<AddBook />} />
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
