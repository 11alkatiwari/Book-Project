import React from "react";
const Bookcard = ({ data }) => {
  return (
    <div className="card book-card text-light bg-dark">
      {/* Book Image */}
      <div className="book-image-container">
        <img src={data.image} alt="Book Cover" className="card-img-top img-fluid book-img" />
      </div>

      {/* Book Details */}
      <div className="card-body text-center">
        <h2 className="card-title text-warning fw-bold">{data.title}</h2>
        <p className="card-text text-secondary fw-semibold">by {data.author}</p>
        <p className="card-text text-light fs-5 fw-bold">${data.price}</p>
      </div>
    </div>
  );
};

export default Bookcard;
