import { useState, useEffect } from "react";
import { Product } from "../interfaces/product";

export interface ShoppingCart {
  items: ShoppingCartItem[];
}

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   imageName: string;
// }
export interface ShoppingCartItem {
  product: Product;
  quantity: number;
}

export default function useShoppingCart() {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart | null>();
  const [loading, setLoading] = useState(false);

  const addToShoppingCart = (product: Product) => {
    setLoading(true);
    fetch(`http://127.0.0.1:8000/session/shopping-cart/${product.id}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((json) => setShoppingCart(json))
      .finally(() => {
        setLoading(false);
      });
  };

  const removeFromShoppingCart = (product: Product) => {
    fetch(`http://127.0.0.1:8000/session/shopping-cart/${product.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => setShoppingCart(json));
  };

  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/session/shopping-cart")
      .then((response) => response.json())
      .then((json) => {
        setShoppingCart(json);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    shoppingCart,
    addToShoppingCart,
    removeFromShoppingCart,
    loading,
  };
}
