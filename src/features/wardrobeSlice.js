import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  outfits: [], // ✅ Ensure this is initialized
};

const wardrobeSlice = createSlice({
  name: "wardrobe",
  initialState,
  reducers: {
    addOutfit: (state, action) => {
      state.outfits.push(action.payload);
    },
    removeOutfit: (state, action) => {
      state.outfits = state.outfits.filter(
        (outfit) => outfit.id !== action.payload
      );
    },
    clearWardrobe: (state) => {
      state.outfits = [];
    },
  },
});

export const { addOutfit, removeOutfit, clearWardrobe } = wardrobeSlice.actions;
export default wardrobeSlice.reducer;
