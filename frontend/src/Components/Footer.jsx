import React from 'react';
import "./Footer.css";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 fixed-bottom">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Section (Copyright) */}
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0">&copy; 2024 BookProject. All rights reserved.</p>
          </div>

          {/* Right Section (Links) */}
          <div className="col-md-6 text-center text-md-end">
              <Link className="text-light text-decoration-none mx-2" to="/About">About</Link>
              <Link className="text-light text-decoration-none mx-2" to="/Contact">Contact</Link>
              <Link className="text-light text-decoration-none mx-2" to="/Policy">Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
