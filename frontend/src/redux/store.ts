import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";

import booksApi from "./features/books/booksApi";
import ordersApi from "./features/orders/ordersApi";
import statsApi from "./features/stats/statsApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,

    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      booksApi.middleware,
      ordersApi.middleware,
      statsApi.middleware
    ),
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;