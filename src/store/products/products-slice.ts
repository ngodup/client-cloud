// features/products/productsSlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
// import { Product } from "../interfaces/product";
import dummyData from "../../db/data"; // dummy data

interface ProductsState {
  query: string;
  selectedCategory: string | null;
  products: any[]; // Replace 'any' with the appropriate type for your products
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  query: "",
  selectedCategory: null,
  products: [],
  //products: dummyData,
  status: "idle",
  error: null,
};

// Define the async thunk to fetch products from the server
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/products");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch products");
    }
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { setQuery, setSelectedCategory } = productsSlice.actions;

export default productsSlice.reducer;
