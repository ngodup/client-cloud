import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import "react-responsive-modal/styles.css";
import { useAppSelector } from "../../../store";
import "./Header.css";

interface HeaderProps {
  handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
}

const Header: React.FC<HeaderProps> = ({ handleSearchInputChange, query }) => {
  const cartItems = useAppSelector((state) => state.carts.items);
  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <nav>
        <div className="nav-container">
          <input
            className="search-input"
            type="text"
            onChange={handleSearchInputChange}
            value={query}
            placeholder="Rechercher des menus alimentaires."
          />
        </div>
        <div className="link-container">
          <Link to="/" className="nav-link">
            Accueil
          </Link>

          <Link to="/gallery" className="nav-link">
            Galerie
          </Link>

          <Link to="/contact" className="nav-link">
            Contact
          </Link>

          {/* <a href="#">
          <FiHeart className="nav-icons" />
        </a> */}
          <Link to="/cart" className="nav-link cart-link">
            {cartItemsCount > 0 && (
              <span className="cart-count">{cartItemsCount}</span>
            )}
            <AiOutlineShoppingCart className="nav-icons" />
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
          <Link to="/login" className="nav-link">
            <AiOutlineUserAdd className="nav-icons" />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
