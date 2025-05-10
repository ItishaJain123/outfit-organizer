import { configureStore } from "@reduxjs/toolkit";
import wardrobeSlice from "../features/wardrobeSlice";

const store = configureStore({
  reducer: { wardrobe: wardrobeSlice },
});

export default store;
