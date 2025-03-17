import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetUnitList,
  apiCreateUnit,
  apiUpdateUnit,
  apiGetUnitById,
  apiDeleteUnit,
} from "./unitsApi";
import { CREATE_UNIT } from "./type";

// Fetch unit list thunk
export const fetchUnitList = createAsyncThunk(
  "units/fetchUnitList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetUnitList();
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Create unit thunk
export const createUnit = createAsyncThunk(
  "units/createUnit",
  async ({ unitData }: { unitData: CREATE_UNIT }, { rejectWithValue }) => {
    try {
      const response = await apiCreateUnit(unitData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Update unit thunk
export const updateUnit = createAsyncThunk(
  "units/updateUnit",
  async (
    { id, unitData }: { id: number | string | null; unitData: CREATE_UNIT },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiUpdateUnit(id, unitData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Get unit by id thunk
export const getUnitById = createAsyncThunk(
  "units/getUnitById",
  async (id: number | string | null, { rejectWithValue }) => {
    try {
      const response = await apiGetUnitById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Delete unit thunk
export const deleteUnit = createAsyncThunk(
  "units/deleteUnit",
  async (id: number | string | null, { rejectWithValue }) => {
    try {
      const response = await apiDeleteUnit(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);
