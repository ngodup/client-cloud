import React from "react";
import ProductCard from "../shared/ProductCard";
import { Product } from "../../interfaces/product";
import { ShoppingCart } from "../../hooks/useShoppingCart";
import "./Products.css";

interface ProductsProps {
  filteredProducts: Product[];
  addToShoppingCart: (product: Product) => void;
}

const Products: React.FC<ProductsProps> = ({
  filteredProducts,
  addToShoppingCart,
}) => {
  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <section className="card-container">
      {filteredProducts.map((product: Product, index: number) => (
        <ProductCard
          key={index}
          product={product}
          addToShoppingCart={addToShoppingCart}
        />
      ))}
    </section>
  );
};

export default Products;
