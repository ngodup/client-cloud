import React from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import { useAppSelector } from "../../store";
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
          Home
        </Link>

        <Link to="/gallery" className="nav-link">
          Gallery
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
        {/* <a href="">
          <AiOutlineUserAdd className="nav-icons" />
        </a> */}
      </div>
    </nav>
  );
};

export default Header;
