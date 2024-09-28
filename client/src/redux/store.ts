import { configureStore } from "@reduxjs/toolkit";
import compilerSlice from "./slices/compilerSlice";
export const store = configureStore({
  reducer: {
    compilerSlice,
  },
});

export type RooState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
