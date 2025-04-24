import React from "react";
import "./About.css"; // Import custom CSS

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>📚 Welcome to Book Haven</h1>
        <p>Your one-stop destination for the best books across all genres.</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>📖 Who We Are</h2>
          <p>
            Book Haven is a paradise for book lovers, offering a vast collection
            of books ranging from classics to modern bestsellers. We aim to
            bring readers closer to their favorite books effortlessly.
          </p>
        </div>

        <div className="about-section">
          <h2>🌟 Our Mission</h2>
          <p>
            Our mission is to make reading accessible and enjoyable for
            everyone. We believe in the power of books to educate, inspire, and
            entertain.
          </p>
        </div>

        <div className="about-section">
          <h2>🚀 Why Choose Us?</h2>
          <ul>
            <li>✔ A diverse collection of books</li>
            <li>✔ Easy-to-use search and filter options</li>
            <li>✔ Secure and fast checkout process</li>
            <li>✔ Personalized book recommendations</li>
            <li>✔ 24/7 customer support</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>📩 Get In Touch</h2>
          <p>
            Have any questions? Feel free to{" "}
            <a href="/contact">contact us</a> or explore our{" "}
            <a href="/faq">FAQs</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
