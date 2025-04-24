import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // ✅ Get Book ID from URL
import axios from "axios";
import "./ViewBookDetails.css"; // ✅ Import custom styles
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Bootstrap
// import "font-awesome/css/font-awesome.min.css"; // ✅ FontAwesome for icons

const ViewBookDetails = () => {
  const { id } = useParams(); // ✅ Get book ID from URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
        setBook(response.data.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setError("⚠️ Unable to fetch book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]); // ✅ Re-fetch when `id` changes

  return (
    <div className="container py-5">
      {loading ? (
        // 🔄 Show a Bootstrap spinner while loading
        <div className="text-center">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : book ? (
        <div className="row bg-dark text-light p-4 rounded">
          {/* Left Section - Book Image */}
          <div className="col-md-4 text-center">
            <img src={book.image} alt={book.title} className="img-fluid rounded shadow-lg book-cover" />
          </div>

          {/* Right Section - Book Details */}
          <div className="col-md-8">
            <h1 className="text-warning">{book.title}</h1>
            <h4 className="text-secondary">by {book.author}</h4>
            <p className="mt-3">{book.description || "📖 No description available."}</p>
            <h5 className="text-success fw-bold mt-4">💰 Price: ₹{book.price}</h5>

            {/* Favorite & Add to Cart Buttons */}
            <div className="mt-4">
              <button className="btn btn-outline-danger me-3">
                <i className="fa fa-heart"></i> ❤️ Add to Favorites
              </button>
              <button className="btn btn-warning">
                <i className="fa fa-shopping-cart"></i> 🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-danger">📚 Book not found!</div>
      )}
    </div>
  );
};

export default ViewBookDetails;
