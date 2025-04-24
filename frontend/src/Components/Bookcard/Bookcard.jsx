import React from "react";
import { Link } from "react-router-dom";
const Bookcard = ({ data }) => {
  return (
    <Link to="/view-book-details/$(data._id)" className="text-decoration-none">
      <div className="card book-card text-light bg-dark">
        {/* Book Image */}
        <div className="book-image-container">
          <img src={data.image} alt="Book Cover" className="card-img-top img-fluid" />
        </div>

        {/* Book Details */}
        <div className="card-body text-center">
          <h2 className="card-title text-warning fw-bold">{data.title}</h2>
          <p className="card-text text-secondary fw-semibold">by {data.author}</p>
          <p className="card-text text-light fs-5 fw-bold">${data.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default Bookcard;
