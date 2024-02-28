import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import noteReducer from './notes/noteSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    note: noteReducer,
  },
});