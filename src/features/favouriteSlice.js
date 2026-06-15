import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(
  localStorage.getItem("favorites")
) || [];

const favoriteSlice = createSlice({
  name: "favorites",

  initialState,

  reducers: {

    addFavorite: (state, action) => {

      const exists = state.find(
        technology =>
          technology.id === action.payload.id
      );

      if (!exists) {
        state.push(action.payload);
        localStorage.setItem(
          "favorites",
          JSON.stringify(state)
        );
      }

    },

    removeFavorite: (state, action) => {

      const updated = state.filter(
        technology =>
          technology.id !== action.payload
      );

      localStorage.setItem(
        "favorites",
        JSON.stringify(updated)
      );

      return updated;

    },

    clearFavorites: () => {
      localStorage.setItem("favorites", JSON.stringify([]));
      return [];
    }

  }
});

export const {
  addFavorite,
  removeFavorite,
  clearFavorites
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
