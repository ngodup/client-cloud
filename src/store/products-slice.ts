// features/products/productsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import products from "../db/data";

interface ProductsState {
  query: string;
  selectedCategory: string | null;
  products: any[]; // Replace 'any' with the appropriate type for your products
}

const initialState: ProductsState = {
  query: "",
  selectedCategory: null,
  products: products, // Your initial products data can go here or be loaded via an effect
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    // Optionally, if you load products asynchronously:
    setProducts: (state, action: PayloadAction<any[]>) => {
      state.products = action.payload;
    },
  },
});

export const { setQuery, setSelectedCategory, setProducts } =
  productsSlice.actions;

export default productsSlice.reducer;
