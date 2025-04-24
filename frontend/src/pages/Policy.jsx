import React from "react";
import "./Policy.css"; // Import custom CSS

const Policy = () => {
  return (
    <div className="policy-container">
      <h1>📜 Our Policy</h1>

      <div className="policy-section">
        <h2>📦 Return Policy</h2>
        <p>
          We accept returns within 7 days of purchase. The book must be in its original condition.
          Shipping charges are non-refundable.
        </p>
      </div>

      <div className="policy-section">
        <h2>🛡 Privacy Policy</h2>
        <p>
          We value your privacy. Your personal data will only be used for order processing and will not
          be shared with third parties.
        </p>
      </div>

      <div className="policy-section">
        <h2>💳 Payment Policy</h2>
        <p>
          We accept payments via credit card, debit card, and PayPal. All transactions are secured and encrypted.
        </p>
      </div>

      <div className="policy-section">
        <h2>📞 Contact Support</h2>
        <p>
          If you have any questions, feel free to contact our support team at <strong>support@bookbank.com</strong>.
        </p>
      </div>
    </div>
  );
};

export default Policy;
