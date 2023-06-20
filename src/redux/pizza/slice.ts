import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, Status } from "./types";
import { fetchPizzas } from "./asyncActions";

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
};


export type FetchParams = {
  categories?: string;
  search: string;
  sort: {
    name?: string;
    sortProperty?: "rating" | "price" | "title";
  };
};

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  }
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;