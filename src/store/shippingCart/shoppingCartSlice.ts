import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ShoppingCartState,
  ShoppingCartProduct,
} from "../../interfaces/shoppingCart";

// export interface CartState {
//   products: ShoppingCartProduct[];
//   total_price: number;
// }

const initialState: ShoppingCartState = {
  status: "pending",
  paymentMethod: "credit card",
  total_price: 0,
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ShoppingCartProduct>) => {
      const existingItemIndex = state.products.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        state.products[existingItemIndex].quantity += 1;
      } else {
        state.products.push({
          id: action.payload.id,
          name: action.payload.name,
          imageName: action.payload.imageName,
          price: action.payload.price,
          quantity: 1,
        });
      }
      state.total_price += action.payload.price;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemIndex = state.products.findIndex(
        (item) => item.id === action.payload
      );

      if (itemIndex !== -1) {
        const item = state.products[itemIndex];

        if (item.quantity > 0) {
          state.products[itemIndex].quantity -= 1;
        } else {
          state.products.splice(itemIndex, 1);
        }
        state.total_price -= item.price;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const itemIndex = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        const item = state.products[itemIndex];
        const quantityDifference = action.payload.quantity - item.quantity;
        state.products[itemIndex].quantity = action.payload.quantity;
        state.total_price += quantityDifference * item.price;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    hydrateCart: (state, action: PayloadAction<ShoppingCartState>) => {
      state.products = action.payload.products;
      state.total_price = action.payload.total_price;
      state.status = action.payload.status;
      state.paymentMethod = action.payload.paymentMethod;
      state.total_price = action.payload.total_price;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  hydrateCart,
} = cartSlice.actions;
export default cartSlice.reducer;
