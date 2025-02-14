import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products/')
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products", error));
  }, []);

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h1>Products</h1>
      {products.map(product => (
        <section key={product.id} className="section">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          {product.image && <img src={`http://127.0.0.1:8000${product.image}`} alt={product.name} />}
        </section>
      ))}
    </div>
  );
}

export default Products;
