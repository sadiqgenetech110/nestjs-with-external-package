// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import { chatApi } from "../services/chatApi";
import chatReducer from "../services/chatSlice"; // 👈 add this

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    chat: chatReducer, // 👈 add reducer for slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(chatApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
