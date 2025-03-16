import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetShipmentTypeList,
  apiCreateShipmentType,
  apiUpdateShipmentType,
  apiGetShipmentTypeById,
  apiDeleteShipmentType,
} from "./shipmentTypesApi";
import { CREATE_SHIPMENT_TYPE } from "./type";

// Fetch shipment type list thunk
export const fetchShipmentTypeList = createAsyncThunk(
  "shipmentTypes/fetchShipmentTypeList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetShipmentTypeList();
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Create shipment type thunk
export const createShipmentType = createAsyncThunk(
  "shipmentTypes/createShipmentType",
  async (
    { shipmentTypeData }: { shipmentTypeData: CREATE_SHIPMENT_TYPE },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiCreateShipmentType(shipmentTypeData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Update shipment type thunk
export const updateShipmentType = createAsyncThunk(
  "shipmentTypes/updateShipmentType",
  async (
    {
      id,
      shipmentTypeData,
    }: { id: number | string | null; shipmentTypeData: CREATE_SHIPMENT_TYPE },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiUpdateShipmentType(id, shipmentTypeData);
      return response;
    } catch (error: any) {
      console.log("error-11111111111", error?.response?.data?.message);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Get shipment type by id thunk
export const getShipmentTypeById = createAsyncThunk(
  "shipmentTypes/getShipmentTypeById",
  async (id: number | string | null, { rejectWithValue }) => {
    try {
      const response = await apiGetShipmentTypeById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);
// Delete payment mode thunk
export const deleteShipmentType = createAsyncThunk(
  "shipmentTypes/deleteShipmentType",
  async (id: number | string | null, { rejectWithValue }) => {
    try {
      const response = await apiDeleteShipmentType(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);
