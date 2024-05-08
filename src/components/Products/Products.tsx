import React, { useContext, useMemo, useState, useEffect } from "react";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";
import CustomModal from "../shared/CustomModal/CustomModal";
import ProductCard from "./Card/ProductCard";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
  addToCart,
  removeFromCart,
} from "../../store/shippingCart/shoppingCartSlice";
import "./Products.css";
import { useAppDispatch, useAppSelector } from "../../store";
import AuthContext from "../../context/AuthContext";
import { addComment, deleteAComment, updateComment } from "../../utils/userAPI";
import CommentCard from "./Comment/CommentCard";
import { Product } from "../../interfaces/product";
import AddComment from "./Comment/AddComment";
import { Comment } from "../../interfaces/comment";

interface ProductsProps {
  filteredProducts?: Product[];
}

const Products: React.FC<ProductsProps> = ({ filteredProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productComments, setProductComments] = useState<Comment[]>([]);

  // code for Modal cart increment and Decrment Quantity
  const cartItems = useAppSelector((state) => state.carts.items);
  const dispatch = useAppDispatch();
  const [selectedCommentToEdit, setSelectedCommentToEdit] =
    useState<Comment | null>(null);

  const { userResponse, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true; // to prevent setting state of an unmounted component

    const fetchProductDetails = async () => {
      setProductComments([]);

      if (selectedProduct) {
        try {
          const { data } = await axios.get(
            `http://127.0.0.1:8000/api/products/${selectedProduct.id}`
          );
          if (isMounted) {
            // Check if the component is still mounted before setting state
            const comments: Comment[] = data?.comments;

            setProductComments(comments);
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

  if (filteredProducts?.length === 0) {
    return null;
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (product: Product) => {
    dispatch(removeFromCart(product));
  };
  // End of the code for Modal cart increment and Decrment Quantity

  //CODE TO FETCH comment on the product.
  const handleAddComment = async (content: string, productId: number) => {
    // const userId = userResponse?.user.id;
    const token = localStorage.getItem("token"); // Or however you're storing the token
    if (!token) {
      return;
    }
    try {
      const response = await addComment(productId, content, token);
      alert("Add comment on a product successful");
      if (response) {
        setProductComments([response, ...productComments]);
      }
    } catch (error) {
      alert("Error on adding comment on a product successful " + error);
    }
  };

  // CODE TO EDIT THE COMMENT ON A PRODUCT
  const editComment = (comment: Comment) => {
    setSelectedCommentToEdit(comment);
  };

  const onUpdatedComment = async (content: string, commentId: number) => {
    //Call to api
    const token = localStorage.getItem("token"); // Or however you're storing the token
    if (!token) {
      return;
    }
    try {
      await updateComment(commentId, content, token);
      setProductComments(
        productComments.map((comment) =>
          comment.id === commentId ? { ...comment, content } : comment
        )
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error editing comment:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };
  // CODE TO DELETE THE COMMENT ON A PRODUCT
  const deleteComment = async (commentId: number) => {
    const token = localStorage.getItem("token"); // Or however you're storing the token
    if (!token) {
      return;
    }
    try {
      await deleteAComment(commentId, token);
      setProductComments(
        productComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting comment:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <>
      <section className="card-container">
        {filteredProducts?.map((product: Product, index: number) => (
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
            {productComments &&
              productComments.length > 0 &&
              productComments.map((comment: Comment) => (
                <div key={comment.id}>
                  <CommentCard
                    comment={comment}
                    onEdit={editComment}
                    onDelete={deleteComment}
                    user={userResponse?.user}
                  />
                </div>
              ))}
          </div>

          <div className="add-comment">
            {selectedCommentToEdit ? (
              <AddComment
                isCommentAdd={false}
                onEditComment={onUpdatedComment}
                productId={selectedProduct.id}
                isAuthenticated={isAuthenticated}
                comment={selectedCommentToEdit || undefined}
              />
            ) : (
              <AddComment
                isCommentAdd={true}
                onAddComment={handleAddComment}
                productId={selectedProduct.id}
                isAuthenticated={isAuthenticated}
              />
            )}
          </div>
        </CustomModal>
      )}
    </>
  );
};

export default Products;
