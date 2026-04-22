import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  outfits: [],
};

const wardrobeSlice = createSlice({
  name: "wardrobe",
  initialState,
  reducers: {
    addOutfit: (state, action) => {
      state.outfits.push({ ...action.payload, isFavorite: false });
    },
    removeOutfit: (state, action) => {
      state.outfits = state.outfits.filter(
        (outfit) => outfit.id !== action.payload
      );
    },
    clearWardrobe: (state) => {
      state.outfits = [];
    },
    toggleFavorite: (state, action) => {
      const outfit = state.outfits.find((o) => o.id === action.payload);
      if (outfit) outfit.isFavorite = !outfit.isFavorite;
    },
    updateOutfit: (state, action) => {
      const { id, type, category } = action.payload;
      const outfit = state.outfits.find((o) => o.id === id);
      if (outfit) {
        outfit.type = type;
        outfit.category = category;
      }
    },
  },
});

export const { addOutfit, removeOutfit, clearWardrobe, toggleFavorite, updateOutfit } =
  wardrobeSlice.actions;
export default wardrobeSlice.reducer;
