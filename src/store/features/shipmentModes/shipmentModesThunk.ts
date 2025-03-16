import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetShipmentModeList,
  apiCreateShipmentMode,
  apiUpdateShipmentMode,
  apiGetShipmentModeById,
  apiDeleteShipmentMode,
} from "./shipmentModesApi";
import { CREATE_SHIPMENT_MODE } from "./type";

// Fetch shipment mode list thunk
export const fetchShipmentModeList = createAsyncThunk(
  "shipmentModes/fetchShipmentModeList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetShipmentModeList();
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);
// Create shipment mode thunk
export const createShipmentMode = createAsyncThunk(
  "shipmentModes/createShipmentMode",
  async (
    { shipmentModeData }: { shipmentModeData: CREATE_SHIPMENT_MODE },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiCreateShipmentMode(shipmentModeData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Update shipment mode thunk
export const updateShipmentMode = createAsyncThunk(
  "shipmentModes/updateShipmentMode",
  async (
    {
      id,
      shipmentModeData,
    }: { id: number | string | null; shipmentModeData: CREATE_SHIPMENT_MODE },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiUpdateShipmentMode(id, shipmentModeData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Get shipment mode by id thunk
export const getShipmentModeById = createAsyncThunk(
  "shipmentModes/getShipmentModeById",
  async (id: number | string | null, { rejectWithValue }) => {
    try {
      const response = await apiGetShipmentModeById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Delete shipment mode thunk
export const deleteShipmentMode = createAsyncThunk(
  "shipmentModes/deleteShipmentMode",
  async (id: number | string | null, { rejectWithValue }) => {
    try {
      const response = await apiDeleteShipmentMode(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);
