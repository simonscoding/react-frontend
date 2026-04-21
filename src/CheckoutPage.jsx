// CheckoutPage.js
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "./CartContext"; // Importing the CartContext
import "./css/CheckoutPage.css";

const CheckoutPage = () => {
  // State to store the customer's details
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "credit-card", // Default payment method
  });

  // State to store the total amount for the order
  const [totalAmount, setTotalAmount] = useState(0);

  // Access cart from the CartContext
  const { cart } = useContext(CartContext);

  // Update totalAmount whenever the cart changes
  useEffect(() => {
    let amount = 0;
    for (let i = 0; i < cart.length; i++) {
      amount += cart[i].price * cart[i].quantity;
    }
    setTotalAmount(amount);
  }, [cart]);

  // Handle input changes for customer details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({
      ...customerDetails,
      [name]: value,
    });
  };

  // Handle form submission (submit the order)
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    alert("Order placed successfully!");
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      {/* Form to collect customer details and payment method */}
      <form onSubmit={handleSubmit} className="checkout-form">
        {/* Customer name input */}
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={customerDetails.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Customer email input */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={customerDetails.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Customer address input */}
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={customerDetails.address}
            onChange={handleInputChange}
            placeholder="Enter your address"
            required
          />
        </div>

        {/* Payment method selection */}
        <div className="form-group">
          <label>Payment Method:</label>
          <div>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="credit-card"
                checked={customerDetails.paymentMethod === "credit-card"}
                onChange={handleInputChange}
              />
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={customerDetails.paymentMethod === "paypal"}
                onChange={handleInputChange}
              />
              PayPal
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="bank-transfer"
                checked={customerDetails.paymentMethod === "bank-transfer"}
                onChange={handleInputChange}
              />
              Bank Transfer
            </label>
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <p>Total: ${totalAmount.toFixed(2)}</p>
        </div>

        {/* Submit button */}
        <button type="submit" className="submit-btn">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
