import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoriesStateTypes, getCategoryItemsProps } from "../../types";
import {
  getCategoriesRequest,
  getCategoryItemsRequest,
} from "../../requests/categories";

export const getCategories = createAsyncThunk(
  "/categories/getCategory",
  getCategoriesRequest
);

export const getCategoryItems = createAsyncThunk(
  "/categories/getItems",
  (props: getCategoryItemsProps) => getCategoryItemsRequest(props)
);

const initialState: CategoriesStateTypes = {
  categories: [],
  loadingCategories: false,
  errorCategories: false,
  categoryItems: [],
  loadingCategoryItems: false,
  errorCategoryItems: false,
};

const categoriesSlice = createSlice({
  name: "categoies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.categories = [];
      (state.loadingCategories = true), (state.errorCategories = false);
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      (state.categories = action.payload.data.categories),
        (state.loadingCategories = false),
        (state.errorCategories = false);
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.categories = [];
      (state.loadingCategories = false), (state.errorCategories = true);
    });
    builder.addCase(getCategoryItems.pending, (state) => {
      (state.loadingCategoryItems = true),
        (state.errorCategoryItems = false),
        (state.categoryItems = []);
    });
    builder.addCase(getCategoryItems.fulfilled, (state, action) => {
      (state.loadingCategoryItems = false),
        (state.errorCategoryItems = false),
        (state.categoryItems = action.payload.data.items.data);
    });
    builder.addCase(getCategoryItems.rejected, (state, action) => {});
  },
});

export default categoriesSlice.reducer;
