// cartSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../interfaces/product";

export interface ShoppingCartItem {
  product: Product;
  quantity: number;
}

export interface ShoppingCartState {
  items: ShoppingCartItem[];
}

const initialState: ShoppingCartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<Product>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.id
      );

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];

        if (item.quantity > 1) {
          state.items[itemIndex].quantity -= 1;
        } else {
          state.items.splice(itemIndex, 1);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
