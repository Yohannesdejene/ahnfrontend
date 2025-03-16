import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchShipmentModeList,
  getShipmentModeById,
  createShipmentMode,
  updateShipmentMode,
  deleteShipmentMode,
} from "./shipmentModesThunk"; // These need to be exported later
import { toast } from "react-hot-toast";
import { t } from "@/utils/translation";
import { SHIPMENT_MODES_STATE, CREATE_SHIPMENT_MODE } from "./type";

const initialState: SHIPMENT_MODES_STATE = {
  shipmentModes: [],
  currentShipmentMode: null,
  pagination: {
    page: 1,
    limit: 10,
    numberOfResults: 0,
    numberOfPages: 1,
  },
  loadingShipmentMode: false,
  errorShipmentMode: null,
  createShipmentModeSuccess: false,
  createShipmentModeLoading: false,
  createShipmentModeError: null,
  updateShipmentModeLoading: false,
  updateShipmentModeError: null,
  updateShipmentModeSuccess: false,
  selectedShipmentMode: null,
  getShipmentModeByIdLoading: false,
  getShipmentModeByIdError: null,
};

const shipmentModesSlice = createSlice({
  name: "shipmentModes",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.createShipmentModeLoading = false;
      state.createShipmentModeError = null;
      state.createShipmentModeSuccess = false;
    },
    resetUpdateState: (state) => {
      state.updateShipmentModeLoading = false;
      state.updateShipmentModeError = null;
      state.updateShipmentModeSuccess = false;
    },
  },
  extraReducers: (builder) => {
    let toastId: any = null;

    // Fetch shipment mode list
    builder
      .addCase(fetchShipmentModeList.pending, (state) => {
        state.loadingShipmentMode = true;
        state.errorShipmentMode = null;
      })
      .addCase(
        fetchShipmentModeList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loadingShipmentMode = false;
          state.shipmentModes = action.payload.data?.shipmentModes;
          state.pagination = action.payload?.metadata?.pagination;
        },
      )
      .addCase(fetchShipmentModeList.rejected, (state, action) => {
        state.loadingShipmentMode = false;
        state.errorShipmentMode =
          action.error.message || "Failed to fetch shipment modes";
      });

    // Fetch shipment mode by id
    builder
      .addCase(getShipmentModeById.pending, (state) => {
        state.getShipmentModeByIdLoading = true;
        state.getShipmentModeByIdError = null;
      })
      .addCase(
        getShipmentModeById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getShipmentModeByIdLoading = false;
          state.currentShipmentMode = action.payload.data?.shipmentMode;
        },
      )
      .addCase(getShipmentModeById.rejected, (state, action) => {
        state.getShipmentModeByIdLoading = false;
        state.getShipmentModeByIdError =
          action.error.message || "Failed to fetch shipment mode by id";
      });

    // Create shipment mode
    builder
      .addCase(createShipmentMode.pending, (state) => {
        state.createShipmentModeLoading = true;
        state.createShipmentModeError = null;
        state.createShipmentModeSuccess = false;
        toastId = toast.loading(`Creating shipment mode...`);
      })
      .addCase(
        createShipmentMode.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.createShipmentModeLoading = false;
          state.createShipmentModeSuccess = true;
          toast.success(t("Shipment mode created successfully"), {
            id: toastId,
          });
        },
      )
      .addCase(createShipmentMode.rejected, (state, action) => {
        state.createShipmentModeLoading = false;
        state.createShipmentModeSuccess = false;
        state.createShipmentModeError =
          action.error.message || "Failed to create shipment mode";
        toast.error(`${action?.payload || "Failed to create shipment mode"}`, {
          id: toastId,
        });
      });

    // Update shipment mode
    builder
      .addCase(updateShipmentMode.pending, (state) => {
        state.updateShipmentModeLoading = true;
        state.updateShipmentModeError = null;
        state.updateShipmentModeSuccess = false;
        toastId = toast.loading(`Updating shipment mode...`);
      })
      .addCase(
        updateShipmentMode.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.updateShipmentModeLoading = false;
          state.updateShipmentModeSuccess = true;

          state.shipmentModes = state.shipmentModes.map((shipmentMode: any) =>
            shipmentMode.id === action.payload.id
              ? action.payload
              : shipmentMode,
          );

          // Update selectedShipmentMode if it's the same as the updated shipment mode
          if (
            state.selectedShipmentMode &&
            state.selectedShipmentMode.id === action.payload.id
          ) {
            state.selectedShipmentMode = action.payload;
          }
          toast.success(t("Shipment mode updated successfully"), {
            id: toastId,
          });
        },
      )
      .addCase(updateShipmentMode.rejected, (state, action) => {
        state.updateShipmentModeLoading = false;
        state.updateShipmentModeError =
          action.error.message || "Failed to update shipment mode";

        toast.error(`${action?.payload || "Failed to update shipment mode"}`, {
          id: toastId,
        });
      });

    // Delete shipment mode
    builder
      .addCase(deleteShipmentMode.pending, (state) => {
        toastId = toast.loading(`Deleting shipment mode...`);
      })
      .addCase(
        deleteShipmentMode.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.shipmentModes = state.shipmentModes.filter(
            (shipmentMode: any) => shipmentMode.id !== action.payload.id,
          );
          toast.success(t("Shipment mode deleted successfully"), {
            id: toastId,
          });
        },
      )
      .addCase(deleteShipmentMode.rejected, (state, action) => {
        toast.error(`${action?.payload || "Failed to delete shipment mode"}`, {
          id: toastId,
        });
      });
  },
});

// Export actions and reducer
export const { resetCreateState, resetUpdateState } =
  shipmentModesSlice.actions;

export default shipmentModesSlice.reducer;

// Export thunks so you can use them in other files
export {
  fetchShipmentModeList,
  createShipmentMode,
  updateShipmentMode,
  deleteShipmentMode,
  getShipmentModeById,
};
