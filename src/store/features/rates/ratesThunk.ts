import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetRateList,
  apiCreateRate,
  apiUpdateRate,
  apiGetRateById,
  apiDeleteRate,
} from "./ratesApi";
import { CREATE_RATE } from "./type";

// Fetch rate list thunk
export const fetchRateList = createAsyncThunk(
  "rates/fetchRateList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetRateList();
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Create rate thunk
export const createRate = createAsyncThunk(
  "rates/createRate",
  async ({ rateData }: { rateData: CREATE_RATE }, { rejectWithValue }) => {
    try {
      const response = await apiCreateRate(rateData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Update rate thunk
export const updateRate = createAsyncThunk(
  "rates/updateRate",
  async (
    { id, rateData }: { id: number | string | null; rateData: CREATE_RATE },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiUpdateRate(id, rateData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Get rate by id thunk
export const getRateById = createAsyncThunk(
  "rates/getRateById",
  async (id: number | string | null, { rejectWithValue }) => {
    try {
      const response = await apiGetRateById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Delete rate thunk
export const deleteRate = createAsyncThunk(
  "rates/deleteRate",
  async (id: number | string | null, { rejectWithValue }) => {
    try {
      const response = await apiDeleteRate(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);
