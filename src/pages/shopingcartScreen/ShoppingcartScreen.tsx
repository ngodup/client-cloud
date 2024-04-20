import React from "react";
import { Product } from "../../interfaces/product";
import { useAppDispatch, useAppSelector } from "../../store";
import { formatPrice, visit } from "../../utils/date";
import { removeFromCart } from "../../store/shippingCart/shoppingCartSlice";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./ShoppingcartScreen.css";

interface ShoppingcartScreenProps {}

const ShoppingcartScreen: React.FC<ShoppingcartScreenProps> = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.carts.items);

  const cart = {
    items: cartItems.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    })),
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/stripe/checkout-sessions",
        cart
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
    <div className="container">
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
              <button className="checkout-button" onClick={handleCheckout}>
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
                          src={`/images/products/${item.product.imageName}`}
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

export default ShoppingcartScreen;
