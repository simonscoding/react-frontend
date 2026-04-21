import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://project-api-abgycnhvephdb0c8.canadacentral-01.azurewebsites.net/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load products");
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading products...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div className="grid">
      {products.map((product) => (
        <div key={product.id} className="card">
          <Link to={`/product/${product.id}`} className="link">

            <img
              src={product.thumbnail}
              alt={product.title}
              className="thumbnail"
            />

            <h2 className="title">{product.title}</h2>

            <p className="price">${product.price}</p>

          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;