import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/productsSlice";
import usersReducer from "./features/usersSlice";

export const store = configureStore({
  reducer: { products: productsReducer, users: usersReducer },
});

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
