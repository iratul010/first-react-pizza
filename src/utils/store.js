import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import cartReducer from "../features/cart/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    user: cartReducer,
  },
});
export default store;
