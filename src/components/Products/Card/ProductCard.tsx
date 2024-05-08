import React, { useCallback } from "react";
import { FaCartPlus } from "react-icons/fa";
import { Product } from "../../../interfaces/product";
import { useAppDispatch } from "../../../store";
import { addToCart } from "../../../store/shippingCart/shoppingCartSlice";
import { AiFillStar } from "react-icons/ai";
import { formatPrice } from "../../../utils/general";

interface ProductCardProps {
  product: Product;
  setSelectedProduct: (product: Product) => void;
}

const generateStars = (maxRating: number) => {
  const rating = Math.floor(Math.random() * (maxRating + 1));
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(
        <AiFillStar key={i} className="rating-star" title="Rating star" />
      );
    } else {
      stars.push(
        <AiFillStar
          key={i}
          className="rating-star-empty"
          title="Empty rating star"
        />
      );
    }
  }
  return stars;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  setSelectedProduct,
}) => {
  const { imageName, name, price, active } = product;
  const reviews = 4;
  const rating = 3;

  const dispatch = useAppDispatch();

  const handleAddToCart = useCallback(() => {
    dispatch(addToCart(product));
  }, [dispatch, product]);

  return (
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
        <section className="card-price-rating">
          <div className="price">€{formatPrice(price)}</div>
          {rating ? (
            <div className="rating">{generateStars(rating)}</div>
          ) : null}
        </section>

        <section className="card-addCart-voir">
          <div
            className={`add-cart badge ${!active && "disabled"}`}
            onClick={active ? handleAddToCart : undefined}
          >
            <FaCartPlus className="bag-icon" title="Add to cart" />
            <span className="text-add-to-cart">Ajouter au panier</span>
          </div>

          <div>
            <button onClick={() => setSelectedProduct(product)} className="btn">
              Voir
            </button>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ProductCard;
