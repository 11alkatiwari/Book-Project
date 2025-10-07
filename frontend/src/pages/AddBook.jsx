  // AddBook.jsx
  import React, { useState } from "react";
  import { useDispatch } from "react-redux";
  import { addBook } from "../store/booksSlice";
  import { useNavigate } from "react-router-dom";

  const AddBook = () => {
    const [book, setBook] = useState({
      title: "",
      author: "",
      price: "",
      image: "",
      category: "",
      description: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
      const value = e.target.name === 'price' ? parseFloat(e.target.value) || 0 : e.target.value;
      setBook({ ...book, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await dispatch(addBook(book));

        // ✅ Reset form after successful submit
        setBook({
          title: "",
          author: "",
          price: "",
          image: "",
          category: "",
          description: "",
        });

        // ✅ Navigate to Allbook page after adding
        navigate("/Allbook");
      } catch (err) {
        console.error("❌ Error adding book:", err);
      }
    };

    return (
      <div className="container py-5">
        <h2 className="text-warning mb-4">Add New Book</h2>
        <form onSubmit={handleSubmit} className="bg-dark p-4 rounded">
          <input
            className="form-control mb-3"
            placeholder="Title"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3"
            placeholder="Author"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            className="form-control mb-3"
            placeholder="Price"
            name="price"
            value={book.price}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3"
            placeholder="Image URL"
            name="image"
            value={book.image}
            onChange={handleChange}
            required
          />
          <select
            className="form-select mb-3"
            name="category"
            value={book.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Classic">Classic</option>
            <option value="Self-Help">Self-Help</option>
            <option value="Fantasy">Fantasy</option>
          </select>
          <input
            className="form-control mb-3"
            placeholder="description"
            name="description"
            value={book.description}
            onChange={handleChange}
            required
          />
          <button className="btn btn-warning w-100" type="submit">
            Add Book
          </button> 
        </form>
      </div>
    );
  };

  export default AddBook;
