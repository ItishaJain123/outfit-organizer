import { configureStore } from "@reduxjs/toolkit";
import wardrobeSlice from "../features/wardrobeSlice";

const STORAGE_KEY = "wardrobe_state";

const loadState = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    return serialized ? { wardrobe: JSON.parse(serialized) } : undefined;
  } catch {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.wardrobe));
  } catch {
    // ignore write errors (e.g. private browsing quota)
  }
};

const store = configureStore({
  reducer: { wardrobe: wardrobeSlice },
  preloadedState: loadState(),
});

store.subscribe(() => saveState(store.getState()));

export default store;
