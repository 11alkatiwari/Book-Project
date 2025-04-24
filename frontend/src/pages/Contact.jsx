import React, { useState } from "react";
import "./Contact.css"; // Import custom CSS

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [message, setMessage] = useState("");

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("✅ Your message has been sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" }); // Reset form
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>📞 Contact Us</h1>
        <p>We'd love to hear from you! Feel free to reach out.</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2>📍 Our Location</h2>
          <p>123 Book Bank Street, Bookland, BL 45678</p>

          <h2>📧 Email Us</h2>
          <p>support@bookbank.com</p>

          <h2>☎ Call Us</h2>
          <p>+1 234 567 890</p>
        </div>

        <div className="contact-form">
          <h2>📝 Send Us a Message</h2>
          {message && <div className="success-message">{message}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
