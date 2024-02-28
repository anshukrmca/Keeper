import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

// Action
export const getCurrentUserInfo = createAsyncThunk("getCurrentUserInfo", async () => {
  try {
    const response = await axios.get('/api/user'); // Replace with your API endpoint
    // console.log(response.data);
    return response.data.user; // Corrected the typo
  } catch (error) {
    throw new Error(`Error in getCurrentUserInfo: ${error.message}`);
  }
});


const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    user: null,
    isError: false,
    Message: null
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUserInfo.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getCurrentUserInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(getCurrentUserInfo.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isLoading = false;
      state.isError = true;
      state.Message = action.payload; // Set the error message
    });
  },
});

// selector
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
