import React, { useState } from "react";
import "./Cart.css"; // ✅ Import Custom CSS

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      price: 599,
      image: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
      quantity: 2,
      deliveryDate: "3-5 days",
    },
    {
      id: 2,
      title: "Harry Potter",
      author: "J.K. Rowling",
      price: 899,
      image: "https://m.media-amazon.com/images/I/81YOuOGFCJL.jpg",
      quantity: 1,
      deliveryDate: "5-7 days",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [savedItems, setSavedItems] = useState([]);
  const shippingCharge = 50; // 🚚 Flat Shipping Charge

  // ✅ Increase Quantity
  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // ✅ Decrease Quantity
  const decreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  // ✅ Remove Item from Cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // ✅ Save for Later
  const saveForLater = (id) => {
    const itemToSave = cartItems.find(item => item.id === id);
    setSavedItems([...savedItems, itemToSave]);
    removeFromCart(id);
  };

  // ✅ Apply Promo Code
  const applyPromoCode = () => {
    if (promoCode === "SAVE10") {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };

  // ✅ Calculate Total Price
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalPrice = subtotal - (subtotal * discount) / 100 + shippingCharge;

  return (
    <div className="container py-5">
      <h2 className="text-center text-warning">Your Cart</h2>

      {cartItems.length === 0 ? (
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
                  <th>Delivery</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td><img src={item.image} alt={item.title} className="cart-img" /></td>
                    <td>{item.title} <br /><small>by {item.author}</small></td>
                    <td>
                      <button className="btn btn-sm btn-warning" onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span className="mx-2">{item.quantity}</span>
                      <button className="btn btn-sm btn-warning" onClick={() => increaseQuantity(item.id)}>+</button>
                    </td>
                    <td>₹{item.price * item.quantity}</td>
                    <td>{item.deliveryDate}</td>
                    <td>
                      <button className="btn btn-outline-info btn-sm me-2" onClick={() => saveForLater(item.id)}>⭐ Save</button>
                      <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>🗑 Remove</button>
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
              <h5 className="text-success">Final Total: ₹{totalPrice.toFixed(2)}</h5>

              {/* Promo Code */}
              <input type="text" className="form-control mb-2" placeholder="Enter Promo Code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
              <button className="btn btn-outline-success w-100 mb-2" onClick={applyPromoCode}>Apply Promo</button>

              <button className="btn btn-success w-100">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      )}

      {/* Saved for Later */}
      {savedItems.length > 0 && (
        <div className="mt-4">
          <h4 className="text-warning">Saved for Later</h4>
          <ul className="list-group">
            {savedItems.map(item => (
              <li className="list-group-item bg-dark text-light">
                {item.title} - ₹{item.price}  
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Cart;
