import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type Pizza = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
};

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error"
};

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

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: FetchParams) => {
    const { categories, search, sort } = params;

    const { data } = await axios.get<Pizza[]>(`http://localhost:8080/pizza?${categories}&_sort=${sort.sortProperty}&_order=asc&${search}`);

    return data as Pizza[];
  }
);


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

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;