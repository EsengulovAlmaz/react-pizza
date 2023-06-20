import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchParams } from "./slice";
import axios from "axios";
import { Pizza } from "./types";

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: FetchParams) => {
    const { categories, search, sort } = params;

    const { data } = await axios.get<Pizza[]>(`http://localhost:8080/pizza?${categories}&_sort=${sort.sortProperty}&_order=asc&${search}`);

    return data as Pizza[];
  }
);