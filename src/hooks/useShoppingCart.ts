import { useState } from "react";
import { Product } from "../interfaces/product";

export interface ShoppingCart {
  items: ShoppingCartItem[];
}

export interface ShoppingCartItem {
  product: Product;
  quantity: number;
}

export default function useShoppingCart() {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart>({ items: [] });

  const addToShoppingCart = (product: Product) => {
    const existingItemIndex = shoppingCart.items.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex !== -1) {
      setShoppingCart((prevState) => {
        const updatedItems = [...prevState.items];
        updatedItems[existingItemIndex].quantity += 1;
        return { items: updatedItems };
      });
    } else {
      setShoppingCart((prevState) => ({
        items: [...prevState.items, { product, quantity: 1 }],
      }));
    }
  };

  const removeFromShoppingCart = (product: Product) => {
    setShoppingCart((prevState) => {
      const updatedItems = prevState.items.filter(
        (item) => item.product.id !== product.id
      );
      return { items: updatedItems };
    });
  };

  return {
    shoppingCart,
    addToShoppingCart,
    removeFromShoppingCart,
  };
}
