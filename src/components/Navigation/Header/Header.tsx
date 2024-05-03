import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store";
import AuthContext from "../../../context/AuthContext";
import { useDispatch } from "react-redux";
import { setQuery } from "../../../store/products/products-slice";
import { getQuerySelector } from "../../../store/products/selectors";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserSlash } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import "./Header.css";
import "react-responsive-modal/styles.css";
import { ToastContainer, toast } from "react-toastify";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userResponse, handleLogout } =
    useContext(AuthContext);
  const dispatch = useDispatch();
  const cartItems = useAppSelector((state) => state.carts.items);
  const query = useAppSelector(getQuerySelector);

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const userNameIcon = userResponse?.user?.userProfile?.nom
    .charAt(0)
    .toUpperCase();
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setQuery(event.target.value));
  };

  const onLogout = () => {
    try {
      handleLogout();
      toast.success("Déconnexion de l'utilisateur réussie.");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
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
            <div className="icon-badge-container">
              {cartItemsCount > 0 && (
                <span className="badge cart-count">{cartItemsCount}</span>
              )}
              <AiOutlineShoppingCart className="nav-icons" />
            </div>
          </Link>

          {isAuthenticated ? (
            <div className="user-icon">
              <Link to="/profile">{userNameIcon}</Link>
            </div>
          ) : (
            <Link to="/login" className="nav-link">
              <FaUserSlash className="nav-icons" />
            </Link>
          )}

          {isAuthenticated && (
            <>
              <AiOutlineLogout className="nav-icons" onClick={onLogout} />
            </>
          )}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </nav>
    </>
  );
};

export default Header;
