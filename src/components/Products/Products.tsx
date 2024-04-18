import React from "react";
import ProductCard from "../shared/ProductCard";
import "./Products.css";

interface Product {
  id: string;
  imageName: string;
  name: string;
  star: string;
  reviews: string;
  price: number;
  active: boolean;
}

interface ProductsProps {
  filteredProducts: Product[];
}

const Products: React.FC<ProductsProps> = ({ filteredProducts }) => {
  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <section className="card-container">
      {filteredProducts.map(
        ({ id, imageName, name, star, reviews, price, active }) => (
          <ProductCard
            key={id}
            imageName={`http://127.0.0.1:8000/images/products/${imageName}`}
            name={name}
            star={star}
            reviews={reviews}
            price={price}
            active={active}
          />
        )
      )}
    </section>
  );
};

export default Products;
