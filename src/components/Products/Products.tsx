import React from "react";
import { Product } from "../../interfaces/product";
import "./Products.css";
import ProductCard from "./Card/ProductCard";

interface ProductsProps {
  filteredProducts: Product[];
}

const Products: React.FC<ProductsProps> = ({ filteredProducts }) => {
  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <section className="card-container">
      {filteredProducts.map((product: Product, index: number) => (
        <ProductCard key={index} product={product} />
      ))}
    </section>
  );
};

export default Products;
