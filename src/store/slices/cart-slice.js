import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //reducers are functions that take the current state and an action as arguments, and return the new state.
    addToCart(state, action) {
      state.cartItems.push(action.payload);
    },
    removeFromCart(state, action) {
      let cpyCartItemns = [...state.cartItems];
      cpyCartItemns = cpyCartItemns.filter(
        (item) => item.id !== action.payload
      ); //itt a filter metódussal kiszűrjük azokat az elemeket amelyeknek az id-je megegyezik az action.payload-al

      state.cartItems = cpyCartItemns; //a state.cartItems értékét átállítjuk a cpyCartItemns értékére
      return state;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
