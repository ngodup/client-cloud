import React from "react";
import { BsFillBagPlusFill } from "react-icons/bs";
import { BsFillBagXFill } from "react-icons/bs";

interface ProductCardProps {
  imageName: string;
  name: string;
  star: string;
  reviews: string;
  price: number;
  active: boolean;
}
const ProductCard: React.FC<ProductCardProps> = ({
  imageName,
  name,
  star,
  reviews,
  price,
  active,
}) => {
  return (
    <>
      <section className="card">
        <img src={imageName} alt={name} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">{name}</h3>
          <section className="card-reviews">
            {star} {star} {star} {star}
            <span className="total-reviews">{reviews}</span>
          </section>
          <section className="card-price">
            <div className="price">€{price}</div>
            <div className="bag">
              {active ? (
                <BsFillBagPlusFill className="bag-icon" />
              ) : (
                <BsFillBagXFill className="bag-icon" color="red" />
              )}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default ProductCard;
