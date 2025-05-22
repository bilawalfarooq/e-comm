import React, { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";

const Home = ({ products }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="container product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
      ))}
    </div>
  );
};

export default Home;
