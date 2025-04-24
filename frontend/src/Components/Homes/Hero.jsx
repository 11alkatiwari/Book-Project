import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css"; // Importing custom styles

const Hero = () => {
  return (
    <div className="container-fluid bg-dark text-light py-5 hero-section">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Section (Text & CTA) */}
          <div className="col-lg-6 text-center text-lg-start">
            <h1 className="display-4 fw-bold text-warning">
              Discover Your Next Great Read
            </h1>
            <p className="mt-3 fs-5">
              Explore our curated collection of books, discover new authors, and
              get recommendations based on your reading preferences.
            </p>

            {/* CTA Button */}
            <Link to="/Allbook">
              <button className="btn btn-outline-warning btn-lg mt-4 hover-grow">
                Discover Books
              </button>
            </Link>
          </div>

          {/* Right Section (Image) */}
          <div className="col-lg-6 text-center">
            <img src="./gif_3.gif" alt="book" className="img-fluid rounded shadow-lg hero-image" />
          </div>
        </div>

        {/* Additional Features */}
        <div className="row text-center mt-5 g-4">
          <div className="col-md-4">
            <div className="card feature-card">
              <img
                src="https://img.freepik.com/premium-photo/bookshelf-overflowing-with-books-different-genres-styles-created-with-generative-ai_124507-164318.jpg"
                alt="Vast Collection"
                className="card-img-top rounded-top feature-img"
              />
              <div className="card-body">
                <h3 className="text-warning">📚 Vast Collection</h3>
                <p>Browse thousands of books across different genres.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card feature-card">
              <img
                src="https://www.realsimple.com/thmb/KrGb42aamhHKaMzWt1Om7U42QsY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/great-books-for-anytime-2000-4ff4221eb1e54b659689fef7d5e265d5.jpg"
                alt="Personalized Picks"
                className="card-img-top rounded-top feature-img"
              />
              <div className="card-body">
                <h3 className="text-warning">🎯 Personalized Picks</h3>
                <p>Get book recommendations based on your interests.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card feature-card">
              <img
                src="https://media.tacdn.com/media/attractions-splice-spp-674x446/06/75/a4/1e.jpg"
                alt="Easy Access"
                className="card-img-top rounded-top feature-img"
              />
              <div className="card-body">
                <h3 className="text-warning">🚀 Easy Access</h3>
                <p>Read and manage your favorite books with ease.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
