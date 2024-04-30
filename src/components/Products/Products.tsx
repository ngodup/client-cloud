import React, { useContext, useMemo, useState, useEffect } from "react";
import axios from "axios";
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
import AddComment from "./Comment/AddComment";
import AuthContext from "../../context/AuthContext";
import { addComment } from "../../utils/userAPI";
import { formatDate } from "../../utils/general";

interface ProductsProps {
  filteredProducts: Product[];
}

const Products: React.FC<ProductsProps> = ({ filteredProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [commentDetail, setCommentDetail] = useState<any>([]);
  // code for Modal cart increment and Decrment Quantity
  const cartItems = useAppSelector((state) => state.carts.items);
  const dispatch = useAppDispatch();

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true; // to prevent setting state of an unmounted component

    const fetchProductDetails = async () => {
      if (selectedProduct) {
        try {
          const { data } = await axios.get(
            `http://127.0.0.1:8000/api/products/${selectedProduct.id}`
          );
          if (isMounted) {
            // Check if the component is still mounted before setting state
            const comments = data.product.comments;
            setCommentDetail(comments);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchProductDetails();

    return () => {
      isMounted = false; // clean up on component unmount
    };
  }, [selectedProduct]);

  const productQuantity = useMemo(() => {
    if (selectedProduct) {
      const item = cartItems.find(
        (cartItem) => cartItem.product.id === selectedProduct.id
      );
      return item ? item.quantity : 0;
    }
    return 0;
  }, [cartItems, selectedProduct]);

  if (filteredProducts.length === 0) {
    return null;
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (product: Product) => {
    dispatch(removeFromCart(product));
  };
  // End of the code for Modal cart increment and Decrment Quantity

  //Code for adding comment on the product.
  const handleAddComment = async (content: string, productId: number) => {
    // const userId = userResponse?.user.id;
    const token = localStorage.getItem("token"); // Or however you're storing the token
    if (!token) {
      // Handle the case where the token is not available
      return;
    }
    try {
      await addComment(productId, content, token);
      alert("Add comment on a product successful");
    } catch (error) {
      // Handle the error here
      alert("Error on adding comment on a product successful " + error);
    }
  };

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
              <p>Description: {selectedProduct.description}</p>
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

          <div>
            {commentDetail &&
              commentDetail.length > 0 &&
              commentDetail.map((comment: any, index: number) => (
                <div className="comment" key={index}>
                  <div className="profile-image">
                    <img src="/avatar.jpg" alt="Avatar" id="icon" />
                    <span className="comment-author">Keanu</span>
                  </div>
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="comment-date">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <div className="comment-text">{comment.content}</div>
                  </div>
                </div>
              ))}
          </div>

          <div className="add-comment">
            {isAuthenticated && (
              <AddComment
                onAddComment={handleAddComment}
                productId={selectedProduct.id}
              />
            )}
          </div>
        </CustomModal>
      )}
    </>
  );
};

export default Products;
