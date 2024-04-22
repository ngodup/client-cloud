import React, { useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { Product } from "../../../interfaces/product";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  addToCart,
  removeFromCart,
} from "../../../store/shippingCart/shoppingCartSlice";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { imageName, name, price, active } = product;
  const reviews = 4;
  const rating = 3;

  const dispatch = useAppDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (product: Product) => {
    dispatch(removeFromCart(product));
  };

  const cartItems = useAppSelector((state) => state.carts.items);

  const productQuantity = useMemo(() => {
    const item = cartItems.find(
      (cartItem) => cartItem.product.id === product.id
    );
    return item ? item.quantity : 0;
  }, [cartItems, product.id]);

  const generateStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<AiFillStar key={i} className="rating-star" />);
      } else {
        stars.push(<AiFillStar key={i} className="rating-star-empty" />);
      }
    }
    return stars;
  };

  return (
    <>
      <section className="card">
        <img
          src={`http://127.0.0.1:8000/images/products/${imageName}`}
          alt={name}
          className="card-img"
        />

        <div className="card-details">
          <h3 className="card-title">{name}</h3>
          <section className="card-reviews">
            {/* {star} {star} {star} {star} */}
            <span className="total-reviews">{reviews} Reviews</span>
          </section>
          <section className="card-price">
            <div className="price">€{price}</div>
            {rating && <div className="rating">{generateStars(rating)}</div>}

            <div className="bag">
              <FaPlus
                className="bag-icon"
                onClick={() => handleAddToCart(product)}
              />
              <span className="quantity">{productQuantity}</span>
              <FaMinus
                className="bag-icon"
                onClick={() => handleRemoveFromCart(product)}
              />
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default ProductCard;
