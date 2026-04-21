// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import { CartContext } from "./CartContext";
import "./App.css";

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const productAlreadyInCart = prevCart.find(
        (item) => item.id === product.id
      );
      if (productAlreadyInCart) {
        const updatedCart = prevCart.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        });
        return updatedCart;
      } else {
        const newProduct = {
          ...product,
          quantity: 1,
        };
        return [...prevCart, newProduct];
      }
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </CartContext.Provider>
  );
};

export default App;
