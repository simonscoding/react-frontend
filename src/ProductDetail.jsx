import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "./CartContext";
import "./css/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams(); // this is the index from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("https://project-api-abgycnhvephdb0c8.canadacentral-01.azurewebsites.net/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        const selectedProduct = data[id]; // use index from route
        setProduct(selectedProduct);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load product");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (!product) return <p>Product not found</p>;

  return (
    <div className="detail">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="detail-img"
      />

      <h1 className="detail-title">{product.title}</h1>

      <p className="detail-desc">{product.description}</p>

      <p className="detail-price">${product.price}</p>

      <button
        className="add-btn"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;