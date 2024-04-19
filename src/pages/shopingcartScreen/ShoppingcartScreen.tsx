import React from "react";

import { Product } from "../../interfaces/product";
import { useAppSelector } from "../../store";
// import { formatPrice } from "../../utils/formatPrice";
// import { proceedToCheckout } from "../../utils/proceedToCheckout";
import "./ShoppingcartScreen.css";
import { formatPrice } from "../../utils/date";
import { removeFromCart } from "../../store/shippingCart/shoppingCartSlice";
interface ShoppingcartScreenProps {}

const ShoppingcartScreen: React.FC<ShoppingcartScreenProps> = () => {
  const cartItems = useAppSelector((state) => state.carts.items);

  const handleRemoveFromCart = (product: Product) => {
    dispatch(removeFromCart(product));
  };

  // function proceedToCheckout(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
  //   throw new Error("Function not implemented.");
  // }

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
              {/* <button className="checkout-button" onClick={proceedToCheckout}>
                Procéder au paiement
              </button> */}
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
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
