import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineUserAdd,
} from "react-icons/ai";
import "react-responsive-modal/styles.css";
import { useAppSelector } from "../../../store";
import "./Header.css";
import AuthContext from "../../../context/AuthContext";
import { useDispatch } from "react-redux";
import { setQuery } from "../../../store/products/products-slice";
import { getQuerySelector } from "../../../store/products/selectors";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const cartItems = useAppSelector((state) => state.carts.items);
  const query = useAppSelector(getQuerySelector);

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setQuery(event.target.value));
  };

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

          <Link to="/cart" className="nav-link cart-link">
            {cartItemsCount > 0 && (
              <span className="cart-count">{cartItemsCount}</span>
            )}
            <AiOutlineShoppingCart className="nav-icons" />
          </Link>

          {isAuthenticated ? (
            <Link to="/profile" className="nav-link">
              <AiOutlineUser className="nav-icons" />
            </Link>
          ) : (
            <Link to="/login" className="nav-link">
              <AiOutlineUserAdd className="nav-icons" />
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
