import React, { useState } from "react";
import axios from "axios";

const AddBook = ({ refreshBooks }) => { // ✅ Accept refreshBooks as a prop
  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    image: "",
    category: "",
  });

  const [message, setMessage] = useState("");

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message

    try {
      const response = await axios.post("http://localhost:5000/api/v1/Addbook", book, {
        headers: { "Content-Type": "application/json" }
      });

      if (response.status === 201) {
        setMessage("✅ Book added successfully!");
        setBook({ title: "", author: "", price: "", image: "", category: "" });

        refreshBooks(); // ✅ Refresh book list after adding
      } else {
        setMessage("❌ Failed to add book. Please try again.");
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.response?.data?.message || "Something went wrong!"}`);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center text-warning">Add a New Book</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} className="p-4 bg-dark text-light rounded shadow">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" name="title" className="form-control" value={book.title} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Author</label>
          <input type="text" name="author" className="form-control" value={book.author} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" name="price" className="form-control" value={book.price} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input type="text" name="image" className="form-control" value={book.image} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select name="category" className="form-select" value={book.category} onChange={handleChange} required>
            <option value="">Select a Category</option>
            <option value="Classic">Classic</option>
            <option value="Self-Help">Self-Help</option>
            <option value="Fantasy">Fantasy</option>
          </select>
        </div>

        <button type="submit" className="btn btn-warning w-100">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
