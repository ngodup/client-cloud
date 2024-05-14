import React, { useContext, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserSlash } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineFoodBank } from "react-icons/md";
import { useAppSelector } from "../../../store";
import AuthContext from "../../../context/AuthContext";
import { setQuery } from "../../../store/products/products-slice";
import { getQuerySelector } from "../../../store/products/selectors";
import "./Header.css";
import "react-responsive-modal/styles.css";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userResponse, handleLogout } =
    useContext(AuthContext);
  const dispatch = useDispatch();
  const cartItems = useAppSelector((state) => state.carts.items);
  const query = useAppSelector(getQuerySelector);

  const [isMenuOpen, setMenuOpen] = useState(false);

  //Hide search in all page except home
  const currentPath = window.location.pathname;

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const userNameIcon = userResponse?.user?.userProfile?.nom
    ?.charAt(0)
    .toUpperCase();

  const handleSearchInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setQuery(event.target.value));
    },
    [dispatch]
  );

  const onLogout = () => {
    try {
      handleLogout();
      toast.success("Déconnexion de l'utilisateur réussie.");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const onHandleMobileMenu = () => {
    setMenuOpen(true);
    console.log(isMenuOpen);
  };
  return (
    <>
      <nav>
        <div className="nav-container">
          <MdOutlineFoodBank size={60} color="#F65F" />
          <div className="search-container">
            {currentPath === "/" && (
              <input
                className="search-input"
                type="text"
                onChange={handleSearchInputChange}
                value={query}
                placeholder="Rechercher des menus alimentaires."
              />
            )}
          </div>

          {isMenuOpen ? (
            <div className={`menu-items ${isMenuOpen ? "show" : ""}`}>
              <Link
                to="/"
                className="menu-item"
                onClick={() => setMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                to="/gallery"
                className="menu-item"
                onClick={() => setMenuOpen(false)}
              >
                Galerie
              </Link>
              <Link
                to="/contact"
                className="menu-item"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          ) : (
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
            </div>
          )}

          <Link to="/cart" className="nav-link cart-link">
            <div className="icon-badge-container">
              {cartItemsCount > 0 && (
                <span className="badge cart-count">{cartItemsCount}</span>
              )}
              <AiOutlineShoppingCart className="nav-icons" title="Cart" />
            </div>
          </Link>
          {isAuthenticated ? (
            <div className="user-icon">
              <Link to="/profile" title="Profile">
                {userNameIcon}
              </Link>
            </div>
          ) : (
            <Link to="/login" className="nav-link">
              <FaUserSlash className="nav-icons" />
            </Link>
          )}

          {isAuthenticated && (
            <AiOutlineLogout
              className="nav-icons"
              title="Logout"
              onClick={onLogout}
            />
          )}
          <AiOutlineMenu
            onClick={onHandleMobileMenu}
            className="hamburger-icon"
            size={30}
          />
        </div>
      </nav>
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
    </>
  );
};

export default Header;
