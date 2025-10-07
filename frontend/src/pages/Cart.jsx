import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const shippingCharge = 50;

  // ✅ Get userId from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id || user?.id;

  // ✅ Fetch Cart Items
  const fetchCartItems = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/cart/${userId}`);
      if (res.data.success) {
        setCartItems(res.data.cart);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    if (userId) fetchCartItems();
  }, [userId]);

  // ✅ Increase Quantity
  const increaseQuantity = async (item) => {
    const newQty = item.quantity + 1;
    await axios.put(`http://localhost:5000/api/v1/cart/update`, {
      cartItemId: item._id,
      quantity: newQty,
    });
    fetchCartItems();
  };

  // ✅ Decrease Quantity
  const decreaseQuantity = async (item) => {
    if (item.quantity > 1) {
      const newQty = item.quantity - 1;
      await axios.put(`http://localhost:5000/api/v1/cart/update`, {
        cartItemId: item._id,
        quantity: newQty,
      });
      fetchCartItems();
    }
  };

  // ✅ Remove from Cart
  const removeFromCart = async (id) => {
    await axios.delete(`http://localhost:5000/api/v1/cart/${id}`);
    fetchCartItems();
  };

  // ✅ Apply Promo Code
  const applyPromoCode = () => {
    if (promoCode === "SAVE10") setDiscount(10);
    else setDiscount(0);
  };

  // ✅ Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.bookId.price * item.quantity,
    0
  );
  const totalPrice = subtotal - (subtotal * discount) / 100 + shippingCharge;

  return (
    <div className="container py-5">
      <h2 className="text-center text-warning">Your Cart</h2>

      {!cartItems.length ? (
        <p className="text-center text-light">Your cart is empty.</p>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <table className="table table-dark table-bordered">
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Title</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.bookId.image}
                        alt={item.bookId.title}
                        className="cart-img"
                      />
                    </td>
                    <td>
                      {item.bookId.title} <br />
                      <small>by {item.bookId.author}</small>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => decreaseQuantity(item)}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => increaseQuantity(item)}
                      >
                        +
                      </button>
                    </td>
                    <td>₹{item.bookId.price * item.quantity}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(item._id)}
                      >
                        🗑 Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Summary */}
          <div className="col-md-4">
            <div className="card bg-dark text-light p-3">
              <h4 className="text-warning">Cart Summary</h4>
              <p>Subtotal: ₹{subtotal}</p>
              <p>Shipping: ₹{shippingCharge}</p>
              <p>Discount: {discount}%</p>
              <h5 className="text-success">
                Final Total: ₹{totalPrice.toFixed(2)}
              </h5>

              <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button
                className="btn btn-outline-success w-100 mb-2"
                onClick={applyPromoCode}
              >
                Apply Promo
              </button>

              <button className="btn btn-success w-100">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
