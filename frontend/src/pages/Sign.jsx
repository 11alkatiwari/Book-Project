import React, { useState } from "react";
import axios from "axios";
import "./Sign.css";

const Sign = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    mobile: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/sign-up",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        setMessage("✅ Signup successful! Redirecting...");
        setFormData({
          username: "",
          email: "",
          address: "",
          mobile: "",
          gender: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setMessage("❌ Signup failed! Try again.");
      }
    } catch (error) {
      setMessage(
        `❌ Error: ${error.response?.data?.message || "Something went wrong!"}`
      );
    }
  };

  return (
    <div className="signup-container">
      <div className="form-box">
        <h2 className="text-center text-warning">Create an Account</h2>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mobile</label>
            <input
              type="text"
              name="mobile"
              className="form-control"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              name="gender"
              className="form-control"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-warning w-100">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sign;
