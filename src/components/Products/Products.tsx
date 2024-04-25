import React, { useMemo, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { Product } from "../../interfaces/product";
import CustomModal from "../shared/CustomModal/CustomModal";
import ProductCard from "./Card/ProductCard";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
  addToCart,
  removeFromCart,
} from "../../store/shippingCart/shoppingCartSlice";
import "./Products.css";
import { useAppDispatch, useAppSelector } from "../../store";

interface ProductsProps {
  filteredProducts: Product[];
}

const Products: React.FC<ProductsProps> = ({ filteredProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // code for Modal cart increment and Decrment Quantity
  const cartItems = useAppSelector((state) => state.carts.items);
  const dispatch = useAppDispatch();

  const productQuantity = useMemo(() => {
    if (selectedProduct) {
      const item = cartItems.find(
        (cartItem) => cartItem.product.id === selectedProduct.id
      );
      return item ? item.quantity : 0;
    }
    return 0;
  }, [cartItems, selectedProduct]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (product: Product) => {
    dispatch(removeFromCart(product));
  };
  // End of the code for Modal cart increment and Decrment Quantity

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
              <div className="cart-quantity">
                <FaPlus
                  className={`quantity-btn ${
                    !selectedProduct.active && "disabled"
                  }`}
                  onClick={
                    selectedProduct.active
                      ? () => handleAddToCart(selectedProduct)
                      : undefined
                  }
                />
                <span className="quantity">{productQuantity}</span>
                <FaMinus
                  className={`quantity-btn ${
                    !selectedProduct.active && "disabled"
                  }`}
                  onClick={
                    selectedProduct.active
                      ? () => handleRemoveFromCart(selectedProduct)
                      : undefined
                  }
                />
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
