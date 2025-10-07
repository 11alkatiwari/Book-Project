import React, { useEffect, useState } from "react";
import axios from "axios";
import Bookcard from "../Components/Bookcard/Bookcard";
import "./Allbook.css";
import { Link } from "react-router-dom";

const Allbook = () => {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");

  // ✅ Fetch Books from API
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/v1/get-all-books");
      setData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ✅ Handle Search & Category
  const filteredBooks = Data.filter(
    (book) =>
      (category === "All" || book.category?.toLowerCase() === category.toLowerCase()) &&
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid bg-dark text-light py-4">
      <div className="container">
        <h1 className="text-center text-warning mb-4">All Books</h1>

        {/* Search & Category Filter */}
<div className="row mb-4 justify-content-center">
  <div className="col-md-5">
    <input
      type="text"
      className="form-control"
      placeholder="Search books..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
  <div className="col-md-3">
    <select
      className="form-select"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="All">All Categories</option>
      <option value="Classic">Classic</option>
      <option value="Self-Help">Self-Help</option>
      <option value="Fantasy">Fantasy</option>
    </select>
  </div>
</div>


        {/* Loading, Error or Book Grid */}
        {loading ? (
          <div className="text-center text-light">Loading books...</div>
        ) : filteredBooks.length > 0 ? (
          <div className="row g-4">
            {filteredBooks.map((item) => (
              <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                <Link to={`/view-book-details/${item._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <Bookcard data={item} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-light pt-4">No books found</div>
        )}
      </div>
    </div>
  );
};

export default Allbook;
