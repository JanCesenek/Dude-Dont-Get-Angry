import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./player-slice";

const store = configureStore({
  reducer: { player: playerSlice.reducer },
});

export default store;
