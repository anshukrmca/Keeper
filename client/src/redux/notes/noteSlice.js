import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

// Action
export const getNotes = createAsyncThunk("getNotes", async (_, { getState }) => {
  try {
    const currentUser = getState().user.currentUser;
    const res = await axios.get('/api/note');
    // console.log(res.data.notes);
    return res.data.notes;
  } catch (error) {
    throw new Error(`Error in getNotes: ${error.message}`);
  }
});

const NoteSlice = createSlice({
  name: "note",
  initialState: {
    isLoading: false,
    note: null,
    isError: false,
    Message: null
  },
  extraReducers: (builder) => {
    builder.addCase(getNotes.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.note = action.payload;
    });
    builder.addCase(getNotes.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isLoading = false;
      state.isError = true;
      state.Message = action.payload; // Set the error message
    });
  },
});

// selector
export const selectNotes = (state) => state.note.note;
export default NoteSlice.reducer;
