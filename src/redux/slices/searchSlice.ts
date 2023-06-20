import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ISearch {
  value: string
}

const initialState: ISearch = {
  value: ""
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.value = action.payload;
    }
  }
});

export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer;