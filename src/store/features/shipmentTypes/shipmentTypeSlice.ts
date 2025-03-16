import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchShipmentTypeList,
  getShipmentTypeById,
  createShipmentType,
  updateShipmentType,
  deleteShipmentType,
} from "./shipmentTypesThunk"; // These need to be exported later
import { toast } from "react-hot-toast";
import { t } from "@/utils/translation";
import { SHIPMENT_TYPES_STATE, CREATE_SHIPMENT_TYPE } from "./type";

const initialState: SHIPMENT_TYPES_STATE = {
  shipmentTypes: [],
  currentShipmentType: null,
  pagination: {
    page: 1,
    limit: 10,
    numberOfResults: 0,
    numberOfPages: 1,
  },
  loadingShipmentType: false,
  errorShipmentType: null,
  createShipmentTypeSuccess: false,
  createShipmentTypeLoading: false,
  createShipmentTypeError: null,
  updateShipmentTypeLoading: false,
  updateShipmentTypeError: null,
  updateShipmentTypeSuccess: false,
  selectedShipmentType: null,
  getShipmentTypeByIdLoading: false,
  getShipmentTypeByIdError: null,
};

const shipmentTypesSlice = createSlice({
  name: "shipmentTypes",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.createShipmentTypeLoading = false;
      state.createShipmentTypeError = null;
      state.createShipmentTypeSuccess = false;
    },
    resetUpdateState: (state) => {
      state.updateShipmentTypeLoading = false;
      state.updateShipmentTypeError = null;
      state.updateShipmentTypeSuccess = false;
    },
  },
  extraReducers: (builder) => {
    let toastId: any = null;
    // Fetch shipment type list
    builder
      .addCase(fetchShipmentTypeList.pending, (state) => {
        state.loadingShipmentType = true;
        state.errorShipmentType = null;
      })
      .addCase(
        fetchShipmentTypeList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loadingShipmentType = false;
          state.shipmentTypes = action.payload.data?.shipmentTypes;
          state.pagination = action.payload?.metadata?.pagination;
        },
      )
      .addCase(fetchShipmentTypeList.rejected, (state, action) => {
        state.loadingShipmentType = false;
        state.errorShipmentType =
          action.error.message || "Failed to fetch shipment types";
      });
    // Fetch shipment type by id
    builder
      .addCase(getShipmentTypeById.pending, (state) => {
        state.loadingShipmentType = true;
        state.errorShipmentType = null;
      })
      .addCase(
        getShipmentTypeById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loadingShipmentType = false;
          state.currentShipmentType = action.payload.data?.shipmentType;
          // state.pagination = action.payload?.metadata?.pagination;
        },
      )
      .addCase(getShipmentTypeById.rejected, (state, action) => {
        state.loadingShipmentType = false;
        state.errorShipmentType =
          action.error.message || "Failed to fetch shipment types";
      });

    // Create shipment type
    builder
      .addCase(createShipmentType.pending, (state) => {
        state.createShipmentTypeLoading = true;
        state.createShipmentTypeError = null;
        state.createShipmentTypeSuccess = false;
        toastId = toast.loading(`Creating shipment type...`);
      })
      .addCase(
        createShipmentType.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.createShipmentTypeLoading = false;
          state.createShipmentTypeSuccess = true;
          // state.shipmentTypes.push(action.payload?.data?.shipmentTypes);
          toast.success(t("Shipment type created successfully"), {
            id: toastId,
          });
        },
      )
      .addCase(createShipmentType.rejected, (state, action) => {
        console.log("rejected");
        state.createShipmentTypeLoading = false;
        state.createShipmentTypeSuccess = false;
        state.createShipmentTypeError =
          action.error.message || "Failed to create shipment type";
        toast.error(`${action?.payload || "Failed to create shipment type"}`, {
          id: toastId,
        });
      });
    // Update shipment type
    builder
      .addCase(updateShipmentType.pending, (state) => {
        state.updateShipmentTypeLoading = true;
        state.updateShipmentTypeError = null;
        state.updateShipmentTypeSuccess = false;
        toastId = toast.loading(`Updating shipment type...`);
      })
      .addCase(
        updateShipmentType.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.updateShipmentTypeLoading = false;
          state.updateShipmentTypeSuccess = true;

          state.shipmentTypes = state.shipmentTypes.map((shipmentType: any) =>
            shipmentType.id === action.payload.id
              ? action.payload
              : shipmentType,
          );

          // Update selectedShipmentType if it's the same as the updated shipment type
          if (
            state.selectedShipmentType &&
            state.selectedShipmentType.id === action.payload.id
          ) {
            state.selectedShipmentType = action.payload;
          }
          toast.success(t("Shipment type updated successfully"), {
            id: toastId,
          });
        },
      )
      .addCase(updateShipmentType.rejected, (state, action) => {
        console.log("action.payload", action);
        state.updateShipmentTypeLoading = false;
        state.updateShipmentTypeError =
          action.error.message || "Failed to update shipment type";

        toast.error(`${action?.payload || "Failed to update shipment type"}`, {
          id: toastId,
        });
      });
    // Delete payment mode
    builder
      .addCase(deleteShipmentType.pending, (state) => {
        toastId = toast.loading(`Deleting shipment type...`);
      })
      .addCase(
        deleteShipmentType.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.shipmentTypes = state.shipmentTypes.filter(
            (paymentMode: any) => paymentMode.id !== action.payload.id,
          );
          toast.success(t("Shipment type deleted successfully"), {
            id: toastId,
          });
        },
      )
      .addCase(deleteShipmentType.rejected, (state, action) => {
        toast.error(`${action?.payload || "Failed to delete shipment type "}`, {
          id: toastId,
        });
      });
  },
});

// Export actions and reducer
export const { resetCreateState, resetUpdateState } =
  shipmentTypesSlice.actions;

export default shipmentTypesSlice.reducer;

// Export thunks so you can use them in other files
export {
  fetchShipmentTypeList,
  createShipmentType,
  updateShipmentType,
  deleteShipmentType,
  getShipmentTypeById,
};
