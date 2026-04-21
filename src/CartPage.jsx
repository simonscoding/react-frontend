// CartPage.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import "./css/CartPage.css";
const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  let totalAmount = 0;
  for (let i = 0; i < cart.length; i++) {
    totalAmount += cart[i].price * cart[i].quantity;
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <h3>{item.title}</h3>
              <p>${item.price} x </p>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value))
                }
              />
              <p> = ${item.price * item.quantity}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          ))}
          <h2>Total: ${totalAmount.toFixed(2)}</h2>
          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
