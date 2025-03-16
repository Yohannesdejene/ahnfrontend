import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetPaymentModeList,
  apiCreatePaymentMode,
  apiUpdatePaymentMode,
  apiGetPaymentModeById,
  apiDeletePaymentMode,
} from "./paymentModesApi";
import { CREATE_PAYMENT_MODE } from "./type";

// Fetch payment mode list thunk
export const fetchPaymentModeList = createAsyncThunk(
  "paymentModes/fetchPaymentModeList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetPaymentModeList();
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Create payment mode thunk
export const createPaymentMode = createAsyncThunk(
  "paymentModes/createPaymentMode",
  async (
    { paymentModeData }: { paymentModeData: CREATE_PAYMENT_MODE },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiCreatePaymentMode(paymentModeData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Update payment mode thunk
export const updatePaymentMode = createAsyncThunk(
  "paymentModes/updatePaymentMode",
  async (
    {
      id,
      paymentModeData,
    }: { id: number | string | null; paymentModeData: CREATE_PAYMENT_MODE },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiUpdatePaymentMode(id, paymentModeData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Get payment mode by id thunk
export const getPaymentModeById = createAsyncThunk(
  "paymentModes/getPaymentModeById",
  async (id: number | string | null, { rejectWithValue }) => {
    try {
      const response = await apiGetPaymentModeById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Delete payment mode thunk
export const deletePaymentMode = createAsyncThunk(
  "paymentModes/deletePaymentMode",
  async (id: number | string | null, { rejectWithValue }) => {
    try {
      const response = await apiDeletePaymentMode(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);
