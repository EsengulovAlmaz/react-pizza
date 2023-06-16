import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params, thunkApi) => {
    const { categories, search, sort } = params;
    const { data } = await axios.get(`http://localhost:8080/pizza?${categories}&_sort=${sort.sortProperty}&_order=asc&${search}`)

    return data;
  }
);

const initialState = {
  items: [],
  status: "loading",
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, actions) {
      state.items = actions.payload;
    }
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = "error";
      state.items = [];
    }
  }
});

export const selectPizzaData = state => state.pizza;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;