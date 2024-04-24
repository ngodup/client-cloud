import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { Product } from "../../interfaces/product";
import CustomModal from "../shared/CustomModal/CustomModal";
import ProductCard from "./Card/ProductCard";
import "./Products.css";
interface ProductsProps {
  filteredProducts: Product[];
}

const Products: React.FC<ProductsProps> = ({ filteredProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  console.log("Products component rendered");

  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <>
      <section className="card-container">
        {filteredProducts.map((product: Product, index: number) => (
          <ProductCard
            key={index}
            product={product}
            setSelectedProduct={(product: Product) => {
              console.log("setSelectedProduct called with:", product);
              setSelectedProduct(product);
            }}
          />
        ))}
      </section>

      {selectedProduct && (
        <CustomModal
          isOpen={selectedProduct !== null}
          onClose={() => setSelectedProduct(null)}
        >
          <IoMdCloseCircle
            className="close-modal-icon"
            onClick={() => setSelectedProduct(null)}
          />
          <div className="modal-product">
            <img
              src={`http://127.0.0.1:8000/images/products/${selectedProduct.imageName}`}
              alt={selectedProduct.name}
            />
            <div className="modal-product-details">
              <h3 className="">{selectedProduct.name}</h3>
              <p>{selectedProduct.description}</p>
              <div className="modal-price">
                <strong>Price : </strong>€{selectedProduct.price}
              </div>
              <span className="badge badge-country">
                {selectedProduct?.category}
              </span>
              {selectedProduct?.repas === "végétarien" ? (
                <span className="badge veg">Végétarien</span>
              ) : (
                <span className="badge non-veg">Non végétarien</span>
              )}
              <span className="badge badge-bg">
                {selectedProduct?.repasType}
              </span>
            </div>
          </div>
        </CustomModal>
      )}
    </>
  );
};

export default Products;
