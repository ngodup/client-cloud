import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../store";
import { createOrder } from "../../utils/userAPI";
import { formatPrice, visit } from "../../utils/general";
import {
  ShoppingCartProduct,
  ShoppingCartProductWithoutImage,
  ShoppingCartState,
} from "../../interfaces/shoppingCart";
import { removeFromCart } from "../../store/shippingCart/shoppingCartSlice";

import "./Checkout.css";

interface CheckoutProps {}

const Checkout: React.FC<CheckoutProps> = () => {
  const dispatch = useAppDispatch();
  const { userResponse, token } = useContext(AuthContext);
  const cart: ShoppingCartState = useAppSelector((state) => state.carts);
  const cartProducts:
    | ShoppingCartProduct[]
    | ShoppingCartProductWithoutImage[] = cart?.products;
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
      visit(response.data.url);
    } catch (error) {
      console.error(error);
    }
  };

  const getCartWithoutImages = (cart: ShoppingCartState): ShoppingCartState => {
    const productsWithoutImages: ShoppingCartProductWithoutImage[] =
      cart.products.map((product) => {
        if ("imageName" in product) {
          // This is the type guard
          const { imageName, ...productWithoutImage } = product;
          return productWithoutImage;
        } else {
          return product; // TypeScript knows that product is of type ShoppingCartProductWithoutImage
        }
      });

    return {
      status: cart.status,
      paymentMethod: cart.paymentMethod,
      total_price: cart.total_price,
      products: productsWithoutImages,
    };
  };

  const handleLivraisonCheckout = async () => {
    try {
      const cartWithoutImages = getCartWithoutImages(cart);
      await createOrder(cartWithoutImages, token);
    } catch (error) {
      console.error(error);
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
    </div>
  );
};

export default Checkout;
