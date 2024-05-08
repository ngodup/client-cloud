import React, {
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
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
import CommentForm from "./Comment/CommentForm";
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

  const { isAuthenticated, userResponse } = useContext(AuthContext);
  const user = userResponse?.user;

  const memoizedProductComments = useMemo(
    () => productComments,
    [productComments]
  );

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
      const itemIndex = cartItems.findIndex(
        (cartItem) => cartItem.product.id === selectedProduct.id
      );
      return itemIndex !== -1 ? cartItems[itemIndex].quantity : 0;
    }
    return 0;
  }, [cartItems, selectedProduct]);

  const handleAddToCart = useCallback(
    (product: Product) => {
      const productExists = cartItems.some(
        (item) => item.product.id === product.id
      );
      if (!productExists) {
        dispatch(addToCart(product));
      }
    },
    [cartItems, dispatch]
  );

  const handleRemoveFromCart = useCallback(
    (product: Product) => {
      dispatch(removeFromCart(product));
    },
    [dispatch]
  );
  // End of the code for Modal cart increment and Decrment Quantity

  //CODE TO FETCH comment on the product.
  const handleAddComment = useCallback(
    async (content: string, productId: number) => {
      const token = localStorage.getItem("token"); // Or however you're storing the token
      if (!token) {
        return;
      }
      try {
        const response = await addComment(productId, content, token);
        alert("Add comment on a product successful");
        if (response) {
          setProductComments([response, ...memoizedProductComments]);
        }
      } catch (error) {
        alert("Error on adding comment on a product successful " + error);
      }
    },
    [memoizedProductComments]
  );

  // CODE TO EDIT THE COMMENT ON A PRODUCT
  const editComment = useCallback((comment: Comment) => {
    setSelectedCommentToEdit(comment);
  }, []);

  const onUpdatedComment = useCallback(
    async (content: string, commentId: number) => {
      //Call to api
      const token = localStorage.getItem("token"); // Or however you're storing the token
      if (!token) {
        return;
      }
      try {
        await updateComment(commentId, content, token);
        const commentIndex = memoizedProductComments.findIndex(
          (comment) => comment.id === commentId
        );
        if (commentIndex !== -1) {
          const updatedComments = [...memoizedProductComments];
          updatedComments[commentIndex] = {
            ...updatedComments[commentIndex],
            content,
          };
          setProductComments(updatedComments);
        }
        setSelectedCommentToEdit(null);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error editing comment:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    },
    [memoizedProductComments]
  );
  // CODE TO DELETE THE COMMENT ON A PRODUCT
  const deleteComment = useCallback(
    async (commentId: number) => {
      const token = localStorage.getItem("token"); // Or however you're storing the token
      if (!token) {
        return;
      }
      try {
        await deleteAComment(commentId, token);
        setProductComments(
          memoizedProductComments.filter((comment) => comment.id !== commentId)
        );
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error deleting comment:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    },
    [memoizedProductComments]
  );

  if (!filteredProducts || filteredProducts.length === 0) {
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
            {memoizedProductComments &&
              memoizedProductComments.length > 0 &&
              memoizedProductComments.map((comment: Comment) => (
                <div key={comment.id}>
                  <CommentCard
                    comment={comment}
                    onEdit={editComment}
                    onDelete={deleteComment}
                    user={user}
                  />
                </div>
              ))}
          </div>

          <div className="add-comment">
            {selectedCommentToEdit ? (
              <CommentForm
                isCommentAdd={false}
                onEditComment={onUpdatedComment}
                productId={selectedProduct.id}
                isAuthenticated={isAuthenticated}
                comment={selectedCommentToEdit || undefined}
              />
            ) : (
              <CommentForm
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
