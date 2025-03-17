import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetShipmentsList,
  apiCreateShipment,
  apiGetShipmentById,
  apiUpdateShipment,
  apiGetShipmentsByIdOrAwb,
} from "./shipmentsApi"; // Adjust the import path if necessary
import { SHIPMENT_CREATE_UPDATE } from "./type";

// Fetch shipments list thunk
export const fetchShipmentsList = createAsyncThunk(
  "shipments/fetchShipmentsList",
  async (
    {
      page,
      pageSize,
      filters,
    }: { page: number; pageSize: number; filters?: Record<string, any> },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiGetShipmentsList(page, pageSize, filters);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Create shipment thunk
export const createShipment = createAsyncThunk(
  "shipments/createShipment",
  async (
    { shipmentData }: { shipmentData: SHIPMENT_CREATE_UPDATE },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiCreateShipment(shipmentData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Get shipment by ID thunk
export const getShipmentById = createAsyncThunk(
  "shipments/getShipmentById",
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await apiGetShipmentById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Update shipment thunk
export const updateShipment = createAsyncThunk(
  "shipments/updateShipment",
  async (
    {
      id,
      shipmentData,
    }: { id: number | string; shipmentData: SHIPMENT_CREATE_UPDATE },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiUpdateShipment(id, shipmentData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Get shipments by ID or AWB thunk
export const getShipmentsByIdOrAwb = createAsyncThunk(
  "shipments/getShipmentsByIdOrAwb",
  async (
    { id, awb }: { id?: number | string; awb?: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiGetShipmentsByIdOrAwb(id, awb);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);
