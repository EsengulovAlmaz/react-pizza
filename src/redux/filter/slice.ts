import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilterSliceState, Sort } from "./types";

const initialState: FilterSliceState = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating"
  }
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    }
  }
});

export const { setCategoryId, setSort, setFilters } = filterSlice.actions;

export default filterSlice.reducer;