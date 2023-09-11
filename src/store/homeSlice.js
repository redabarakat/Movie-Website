import { createSlice } from "@reduxjs/toolkit";
import { fetchDataFromApi } from "../utils/api";

const initialState = {
  url: {},
  genres: {},
  loading: false,
  error: null,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataFromApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDataFromApi.fulfilled, (state, action) => {
      state.loading = false;
      // state.url = action.payload;
    });
    builder.addCase(fetchDataFromApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { getApiConfiguration, getGenres } = homeSlice.actions;
export default homeSlice.reducer;
