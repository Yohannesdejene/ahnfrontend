import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchShipmentsList,
  createShipment,
  getShipmentById,
  updateShipment,
  getShipmentsByIdOrAwb,
} from "./shipmentsThunk";
import { SHIPMENT, SHIPMENT_STATE } from "./type";
import { toast } from "react-hot-toast";

const initialState: SHIPMENT_STATE = {
  shipments: [],
  pagination: {
    page: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 1,
  },
  loadingShipments: false,
  errorShipments: null,
  createShipmentSuccess: false,
  createShipmentLoading: false,
  createShipmentError: null,
  updateShipmentLoading: false,
  updateShipmentError: null,
  updateShipmentSuccess: false,
  selectedShipment: null,
  getShipmentByIdLoading: false,
  getShipmentByIdError: null,
  deleteShipmentLoading: false,
  deleteShipmentError: null,
  deleteShipmentSuccess: false,
};

const shipmentsSlice = createSlice({
  name: "shipments",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.createShipmentLoading = false;
      state.createShipmentError = null;
      state.createShipmentSuccess = false;
    },
    resetUpdateState: (state) => {
      state.updateShipmentLoading = false;
      state.updateShipmentError = null;
      state.updateShipmentSuccess = false;
    },
  },
  extraReducers: (builder) => {
    let toastId: any = null;

    // Fetch shipments list
    builder
      .addCase(fetchShipmentsList.pending, (state) => {
        state.loadingShipments = true;
        state.errorShipments = null;
      })
      .addCase(
        fetchShipmentsList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loadingShipments = false;
          state.shipments = action.payload?.data?.shipments || [];
          state.pagination =
            action.payload?.data?.pagination || initialState.pagination;
        },
      )
      .addCase(fetchShipmentsList.rejected, (state, action: any) => {
        state.loadingShipments = false;
        state.errorShipments = action.payload || "Failed to fetch shipments";
      });

    // Create shipment
    builder
      .addCase(createShipment.pending, (state) => {
        state.createShipmentLoading = true;
        state.createShipmentError = null;
        state.createShipmentSuccess = false;
        toastId = toast.loading("Creating shipment...");
      })
      .addCase(createShipment.fulfilled, (state) => {
        state.createShipmentLoading = false;
        state.createShipmentSuccess = true;
        toast.success("Shipment created successfully!", { id: toastId });
      })
      .addCase(createShipment.rejected, (state, action: any) => {
        state.createShipmentLoading = false;
        state.createShipmentSuccess = false;
        state.createShipmentError =
          action.payload || "Failed to create shipment";
        toast.error(state.createShipmentError, { id: toastId });
      });

    // Get shipment by ID
    builder
      .addCase(getShipmentById.pending, (state) => {
        state.getShipmentByIdLoading = true;
        state.getShipmentByIdError = null;
      })
      .addCase(
        getShipmentById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getShipmentByIdLoading = false;
          state.selectedShipment = action.payload?.data?.shipment || null;
        },
      )
      .addCase(getShipmentById.rejected, (state, action: any) => {
        state.getShipmentByIdLoading = false;
        state.getShipmentByIdError =
          action.payload || "Failed to fetch shipment by ID";
      });

    // Update shipment
    builder
      .addCase(updateShipment.pending, (state) => {
        state.updateShipmentLoading = true;
        state.updateShipmentError = null;
        state.updateShipmentSuccess = false;
        toastId = toast.loading("Updating shipment...");
      })
      .addCase(updateShipment.fulfilled, (state) => {
        state.updateShipmentLoading = false;
        state.updateShipmentSuccess = true;
        toast.success("Shipment updated successfully!", { id: toastId });
      })
      .addCase(updateShipment.rejected, (state, action: any) => {
        state.updateShipmentLoading = false;
        state.updateShipmentSuccess = false;
        state.updateShipmentError =
          action.payload || "Failed to update shipment";
        toast.error(state.updateShipmentError, { id: toastId });
      });

    ///get by wb and id
    // Get shipments by ID or AWB
    builder
      .addCase(getShipmentsByIdOrAwb.pending, (state) => {
        state.getShipmentByIdLoading = true;
        state.getShipmentByIdError = null;
      })
      .addCase(
        getShipmentsByIdOrAwb.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getShipmentByIdLoading = false;
          state.selectedShipment = action.payload?.data?.shipment || null; // Stores the result in selectedShipment
        },
      )
      .addCase(getShipmentsByIdOrAwb.rejected, (state, action: any) => {
        state.getShipmentByIdLoading = false;
        state.getShipmentByIdError =
          action.payload || "FailedF to fetch shipment by ID or AWB";
      });
  },
});

// Export actions and reducer
export const { resetCreateState, resetUpdateState } = shipmentsSlice.actions;

export default shipmentsSlice.reducer;

// Export thunks for use in components
export {
  fetchShipmentsList,
  createShipment,
  getShipmentById,
  updateShipment,
  getShipmentsByIdOrAwb,
};
