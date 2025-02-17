import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  complainsList: [],
  loading: false,
  error: null,  // Ensure error is a string, not an AxiosError object
  response: null,
};

const complainSlice = createSlice({
  name: 'complain',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
      state.error = null;  // Reset error on new request
    },
    getSuccess: (state, action) => {
      state.complainsList = action.payload;
      state.loading = false;
      state.error = null;  // Reset error on successful response
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Store only the error message (string)
    }
  },
});

export const { getRequest, getSuccess, getError } = complainSlice.actions;

export const complainReducer = complainSlice.reducer;
