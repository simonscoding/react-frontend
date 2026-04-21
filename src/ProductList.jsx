import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./css/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams(); // this is the index from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://project-api-abgycnhvephdb0c8.canadacentral-01.azurewebsites.net/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        return res.json();
      })
      .then((data) => {
        const selectedProduct = data[id]; // use index from URL
        setProduct(selectedProduct);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load product");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading product...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  }

  if (!product) {
    return <p style={{ textAlign: "center" }}>Product not found</p>;
  }

  return (
    <div className="product-detail">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="product-image"
      />

      <h1>{product.title}</h1>
      <p className="price">${product.price}</p>
      <p className="description">{product.description}</p>

      <button className="add-to-cart">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
