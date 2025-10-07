import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ViewBookDetails.css";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/get-book-by-id/${id}`)
      .then(res => setBook(res.data.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleAddToFavorites = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        alert("Please login to add to favorites.");
        return;
      }
      const response = await axios.put(
        "http://localhost:5000/api/v1/add-favourite",
        { bookid: id },
        { headers: { id: user._id } }
      );
      alert(response.data.message);
    } catch (error) {
      alert("Failed to add to favorites.");
      console.error(error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        alert("Please login to add to cart.");
        return;
      }
      const response = await axios.put(
        "http://localhost:5000/api/v1/add to cart",
        {},
        { headers: { id: user._id, bookid: id } }
      );
      alert(response.data.message);
    } catch (error) {
      alert("Failed to add to cart.");
      console.error(error);
    }
  };

  if (!book) return <p className="text-center">Loading book details...</p>;

  return (
    <div className="container py-5">
      <div className="row bg-dark text-light p-4 rounded">
        {/* Left Section - Book Image */}
        <div className="col-md-4 text-center">
          <img src={book.image} alt={book.title} className="img-fluid rounded shadow-lg" />
        </div>

        {/* Right Section - Book Info */}
        <div className="col-md-8">
          <h1 className="text-warning">{book.title}</h1>
          <h4 className="text-secondary">by {book.author}</h4>
          <p className="mt-3">{book.description || "📖 No description available."}</p>
          <h5 className="text-success fw-bold mt-4">💰 Price: ₹{book.price}</h5>

          {/* Buttons */}
          <div className="mt-4">
            <button className="btn btn-outline-danger me-3" onClick={handleAddToFavorites}>❤️ Add to Favorites</button>
            <button className="btn btn-warning" onClick={handleAddToCart}>🛒 Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookDetails;
