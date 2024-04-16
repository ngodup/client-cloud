import React from "react";
import ProductCard from "../shared/ProductCard";
import "./Products.css";

interface Product {
  id: string;
  img: string;
  title: string;
  star: string;
  reviews: string;
  prevPrice: number;
  newPrice: number;
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
        ({ id, img, title, star, reviews, prevPrice, newPrice }) => (
          <ProductCard
            key={id}
            img={img}
            title={title}
            star={star}
            reviews={reviews}
            prevPrice={prevPrice}
            newPrice={newPrice}
          />
        )
      )}
    </section>
  );
};

export default Products;
