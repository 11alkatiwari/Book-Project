import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import "./navbars.css";

const Navbar = () => {
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  if(isLoggedIn === false) {
    // return (
    //   // <div className="navbar-nav ms-auto">
    //   //   <Link className="nav-link text-white fw-bold" to="/Login">Login</Link>
    //   //   <Link className="nav-link text-white fw-bold" to="/Sign">Sign Up</Link>
    //   // </div>
    // );
  }

  
  return (
    <nav className="navbar navbar-expand-md  px-3">
      <div className="container-fluid">
        {/* Logo & Brand Name */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
            className="me-2"
            style={{ height: "40px" }}
          />
          <h1 className="h4 m-0 text-white">BookBank</h1>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars className="text-white" size={24} />
        </button>
        <div className="collapse navbar-collapse show" id="navbarContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white fw-bold" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-bold" to="/Allbook">All Books</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-bold" to="/Profile">Profile</Link>
            </li>
            <li className="nav-item">
  <Link className="nav-link text-white fw-bold" to="/Addbook">Add Book</Link>
</li>
            <li className="nav-item">
<Link to="/cart" className="btn btn-outline-warning">
  🛒 Cart
</Link>
            </li>
            
          </ul>

          {/* Login & Signup Buttons */}
          <div className="d-flex align-items-center gap-2">
            <Link to="/Login" className="btn btn-outline-light fw-bold">Login</Link>
            <Link to="/Sign" className="btn btn-primary fw-bold">Sign Up</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
