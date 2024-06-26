import React, { useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../store";
import { createOrder } from "../../utils/userAPI";
import { formatPrice, visit } from "../../utils/general";
import {
  ShoppingCartProduct,
  ShoppingCartState,
} from "../../interfaces/shoppingCart";
import {
  removeFromCart,
  clearCart,
} from "../../store/shippingCart/shoppingCartSlice";

import "./Checkout.css";
import { ToastContainer, toast } from "react-toastify";

interface CheckoutProps {}

const Checkout: React.FC<CheckoutProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userResponse, token } = useContext(AuthContext);
  const cart: ShoppingCartState = useAppSelector((state) => state.carts);
  const cartProducts: ShoppingCartProduct[] = cart?.products;
  const totalPrice: number = cart?.total_price;

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

  const handleStripeCheckout = async () => {
    const payloadData = {
      items: cartProducts.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
      })),
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/stripe/checkout-sessions",
        payloadData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Votre commande a été validée.");
      visit(response.data.url);
    } catch (error) {
      console.error(error);
      toast.error(
        "Nous n'avons pas pu traiter votre commande. Veuillez réessayer plus tard ou contacter le service client"
      );
    }
  };

  const handleLivraisonCheckout = async () => {
    try {
      await createOrder(cart, token);
      toast.success("Votre commande a été validée.");
      localStorage.removeItem("cart");
      dispatch(clearCart());
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(
        "Nous n'avons pas pu traiter votre commande. Veuillez réessayer plus tard ou contacter le service client"
      );
    }
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="checkout-container">
      {cartProducts.length === 0 && (
        <div className="empty-cart">
          <h5>Votre panier est vide</h5>
        </div>
      )}
      {cartProducts.length > 0 && (
        <div className="cart">
          <div className="cart-header">
            <div>
              <h5>Votre panier</h5>
            </div>
            <div className="btn-group">
              <button className="btn" onClick={handleStripeCheckout}>
                Procéder au paiement avec Stripe
              </button>
              <button className="btn" onClick={handleLivraisonCheckout}>
                Paiement à la livraison
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
                {cartProducts.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="product-info">
                        {"imageName" in item && ( // This is the type guard
                          <img
                            className="product-image"
                            src={`http://127.0.0.1:8000/images/products/${item.imageName}`}
                            alt={item.name}
                          />
                        )}

                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{formatPrice(item.price)}</td>
                    <td>
                      <button
                        className="remove-button"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan={4}
                    style={{ textAlign: "right", fontWeight: "bold" }}
                  >
                    Total: € {totalPrice.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
  );
};

export default Checkout;
