import React, { useEffect, useState } from "react";
import axios from "axios"; // ✅ Import axios
import Bookcard from "../Components/Bookcard/Bookcard";
import "./Allbook.css"; // Import custom CSS

const Allbook = () => {
  const [Data, setData] = useState([]); // ✅ Initialize as an empty array
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");

  // ✅ Fetch Books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/get-all-books");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []); // ✅ Dependency array ensures this runs only once

  // ✅ Fallback Static Data (If API Fails)
  const fallbackData = [
    {
      id: 1,
      title: "Charlie and the Chocolate Factory",
      author: "Roald Dahl",
      price: "10.99",
      image: "https://www.ankle-biters.co.uk/wp-content/uploads/2022/08/81cwrLoHc6L-e1659699500299.jpg",
      category: "Classic",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      price: "14.99",
      image: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
      category: "Self-Help",
    },
    {
      id: 3,
      title: "Harry Potter",
      author: "J.K. Rowling",
      price: "19.99",
      image: "https://m.media-amazon.com/images/I/81YOuOGFCJL.jpg",
      category: "Fantasy",
    },
    {
      id: 4,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      price: "15.10",
      image: "https://m.media-amazon.com/images/I/51AHZGhzZEL.jpg",
      category: "Classic",
    },
    {
          id: 5,
          title: "Twisted Love",
          author: "Ana Huang",
          price: "9.29",
          image: "https://images.thenile.io/r1000/9780349434278.jpg",
          category: "Fantasy",
        },
        {
          id: 6,
          title: "The Psychology of Money",
          author: "Morgan Housel",
          price: "29.59",
          image: "https://media.shortform.com/covers/png/the-psychology-of-money-cover@8x.png",
          category: "Self-Help",
        },
        {
          id: 7,
          title: "To Kill A Mockingbird",
          author: "Harper Lee",
          price: "39.9",
          image: "https://s-i.huffpost.com/gen/1148926/images/o-CLASSIC-BOOKS-ORIGINAL-COVERS-facebook.jpg",
          category: "Classic",
        },
        {
          id: 8,
          title: "Curious George",
          author: "H.A. Rey",
          price: "50",
          image: "https://www.kindercare.com/-/media/contenthub/images/article-images/activities%20for%20kids/books%20galore/10%20classic%20childrens%20books%20every%20new%20parent%20should%20have/curious-george-cover-compressor.jpg",
          category: "Classic",
        },
  ];

  // ✅ If API fails, use static data
  const booksToDisplay = Data.length > 0 ? Data : fallbackData;

  // ✅ Handle Search Input Change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // ✅ Handle Category Change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // ✅ Filter Books based on Search & Category
  const filteredBooks = booksToDisplay.filter(
    (book) =>
      (category === "All" || book.category === category) &&
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
              onChange={handleSearch}
            />
          </div>
          <div className="col-md-3">
            <select className="form-select" value={category} onChange={handleCategoryChange}>
              <option value="All">All Categories</option>
              <option value="Classic">Classic</option>
              <option value="Self-Help">Self-Help</option>
              <option value="Fantasy">Fantasy</option>
            </select>
          </div>
        </div>

        {/* Book Grid */}
        {filteredBooks.length > 0 ? (
          <div className="row g-4">
            {filteredBooks.map((item) => (
              <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                <Bookcard data={item} />
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
