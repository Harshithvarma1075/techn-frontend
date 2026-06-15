import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "../features/favouriteSlice";
import learningReducer from "../features/learningSlice";

export const store = configureStore({
  reducer: {
    favorites: favoriteReducer,
    learning: learningReducer
  }
});
