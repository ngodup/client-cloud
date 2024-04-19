import React from "react";
import { BsFillBagPlusFill } from "react-icons/bs";
import { BsFillBagXFill } from "react-icons/bs";
import { Product } from "../../interfaces/product";
import { AiFillStar } from "react-icons/ai";

interface ProductCardProps {
  product: Product;
  addToShoppingCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  addToShoppingCart,
}) => {
  const { imageName, name, reviews, price, rating, active } = product;

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
        <img src={imageName} alt={name} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">{name}</h3>
          <section className="card-reviews">
            {/* {star} {star} {star} {star} */}
            <span className="total-reviews">{reviews}</span>
          </section>
          <section className="card-price">
            <div className="price">€{price}</div>
            {rating && <div className="rating">{generateStars(rating)}</div>}

            <div className="bag">
              {active ? (
                <BsFillBagPlusFill
                  className="bag-icon"
                  onClick={() => addToShoppingCart(product)}
                />
              ) : (
                <BsFillBagXFill
                  className="bag-icon"
                  color="red"
                  aria-disabled
                />
              )}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default ProductCard;
