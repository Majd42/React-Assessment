import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/productsSlice";
// import usersReducer from "./features/usersReducer";

// const rootReducer = combineReducers({
//   categories: categoriesReducer,
// });

export const store = configureStore({
  reducer: { products: productsReducer },
});

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
