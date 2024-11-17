import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      // Check if item already exists in cart
      const existingItem = state.items.find(item => item.name === action.payload.name);
      
      if (existingItem) {
        // If item exists, increment quantity
        existingItem.quantity += 1;
      } else {
        // If item doesn't exist, add it with quantity 1
        state.items.push({
          ...action.payload,
          quantity: 1
        });
      }
    },
    
    removeItem: (state, action) => {
      // Remove item from cart based on name
      state.items = state.items.filter(item => item.name !== action.payload.name);
    },
    
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      
      if (item) {
        // Update quantity if item exists and new quantity is valid
        if (quantity > 0) {
          item.quantity = quantity;
        } else {
          // Remove item if quantity is 0 or negative
          state.items = state.items.filter(item => item.name !== name);
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;

export const selectTotalItems = (state) => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};