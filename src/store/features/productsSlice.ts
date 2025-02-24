import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetProductsProps, productsStateTypes } from "../../types";
import { getProductsRequest } from "../../requests/products";

export const getProducts = createAsyncThunk(
  "/products/getProudcts",
  (porps: GetProductsProps) => getProductsRequest(porps)
);

const initialState: productsStateTypes = {
  products: [],
  errorProducts: false,
  loadingProducts: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      (state.products = []),
        (state.loadingProducts = true),
        (state.errorProducts = false);
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      (state.loadingProducts = false),
        (state.products = action.payload.products),
        (state.errorProducts = false);
    });

    builder.addCase(getProducts.rejected, (state) => {
      (state.loadingProducts = false),
        (state.products = []),
        (state.errorProducts = false);
    });
  },
});

export default productsSlice.reducer;
