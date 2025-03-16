import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetPaymentMethodList,
  apiCreatePaymentMethod,
  apiUpdatePaymentMethod,
  apiGetPaymentMethodById,
  apiDeletePaymentMethod,
} from "./paymentMethodsApi";
import { CREATE_PAYMENT_METHOD } from "./type";

// Fetch payment method list thunk
export const fetchPaymentMethodList = createAsyncThunk(
  "paymentMethods/fetchPaymentMethodList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetPaymentMethodList();
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Create payment method thunk
export const createPaymentMethod = createAsyncThunk(
  "paymentMethods/createPaymentMethod",
  async (
    { paymentMethodData }: { paymentMethodData: CREATE_PAYMENT_METHOD },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiCreatePaymentMethod(paymentMethodData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Update payment method thunk
export const updatePaymentMethod = createAsyncThunk(
  "paymentMethods/updatePaymentMethod",
  async (
    {
      id,
      paymentMethodData,
    }: { id: number | string | null; paymentMethodData: CREATE_PAYMENT_METHOD },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiUpdatePaymentMethod(id, paymentMethodData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Get payment method by id thunk
export const getPaymentMethodById = createAsyncThunk(
  "paymentMethods/getPaymentMethodById",
  async (id: number | string | null, { rejectWithValue }) => {
    try {
      const response = await apiGetPaymentMethodById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Delete payment method thunk
export const deletePaymentMethod = createAsyncThunk(
  "paymentMethods/deletePaymentMethod",
  async (id: number | string | null, { rejectWithValue }) => {
    try {
      const response = await apiDeletePaymentMethod(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);
