import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      //payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      //payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state, action) {
      state.cart = [];
    },
  },
});
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
export const getCart = (state) => state.cart.cart;
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, curItem) => sum + curItem.quantity, 0);
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, curItem) => sum + curItem.totalPrice, 0);

// এই লাইনের মাধ্যমে একটি ফাংশন ডিফাইন করা হয়েছে যা id এবং state দুটি প্যারামিটার নেয়। এই ফাংশনের কাজ হলো ক্র্যাট করা পিজা আইডি (id) এর জন্য সংরক্ষিত পরিমাণ (quantity) প্রাপ্ত করা।যদি প্রিভিউসলি সংরক্ষিত পরিমাণ (quantity) আইটেমে থাকে তাহলে ফাংশন সেই মান (quantity) দেখাবে। যদি পরিমাণ (quantity) আইটেমে থাকে না (অর্থাৎ null বা undefined হয়) তাহলে ফাংশন 0 দেখাবে।
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
