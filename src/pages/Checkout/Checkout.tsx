import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Product } from "../../interfaces/product";
import AuthContext from "../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../store";
import { formatPrice, visit } from "../../utils/general";
import { removeFromCart } from "../../store/shippingCart/shoppingCartSlice";

import "./Checkout.css";

interface CheckoutProps {}

const Checkout: React.FC<CheckoutProps> = () => {
  const dispatch = useAppDispatch();
  const { userResponse, token } = useContext(AuthContext);
  const cartItems = useAppSelector((state) => state.carts.items);

  const cart = {
    items: cartItems.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    })),
  };

  if (!userResponse || !token) {
    return (
      <div className="checkIn-no-container">
        <div className="card">
          <p className="card-title">
            Veuillez d'abord vous connecter pour acheter les produits
            alimentaires.
            <Link to="/login" className="nav-link">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/stripe/checkout-sessions",
        cart,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      visit(response.data.url);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromCart = (product: Product) => {
    dispatch(removeFromCart(product));
  };

  return (
    <div className="checkout-container">
      {cartItems.length === 0 && (
        <div className="empty-cart">
          <h5>Votre panier est vide</h5>
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="cart">
          <div className="cart-header">
            <div>
              <h5>Votre panier</h5>
            </div>
            <div>
              <button className="btn" onClick={handleCheckout}>
                Procéder au paiement
              </button>
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Quantité</th>
                  <th>Prix</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.product.id}>
                    <td>
                      <div className="product-info">
                        <img
                          className="product-image"
                          src={`http://127.0.0.1:8000/images/products/${item.product.imageName}`}
                          alt={item.product.name}
                        />
                        <span>{item.product.name}</span>
                      </div>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{formatPrice(item.product.price)}</td>
                    <td>
                      <button
                        className="remove-button"
                        onClick={() => handleRemoveFromCart(item.product)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
