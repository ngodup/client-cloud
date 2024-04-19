import React from "react";
import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import useShoppingCart from "../../hooks/useShoppingCart";
import "./Header.css";

interface HeaderPros {
  handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
}

const Header: React.FC<HeaderPros> = ({ handleSearchInputChange, query }) => {
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
      <div className="profile-container">
        <a href="#">
          <FiHeart className="nav-icons" />
        </a>
        <a href="">
          <AiOutlineShoppingCart className="nav-icons" />
        </a>
        <a href="">
          <AiOutlineUserAdd className="nav-icons" />
        </a>
      </div>
    </nav>
  );
};

export default Header;
