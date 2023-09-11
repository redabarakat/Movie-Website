import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create async function that get data from server
export const fetchDataFromApi = createAsyncThunk(
  "home/fetchDataFromApi",
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get(args.url, { params: args?.filters });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
/**************************************** */
