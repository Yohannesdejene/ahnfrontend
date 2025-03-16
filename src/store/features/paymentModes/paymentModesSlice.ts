import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchPaymentModeList,
  createPaymentMode,
  updatePaymentMode,
  deletePaymentMode,
  getPaymentModeById,
} from "./paymentModesThunk"; // These need to be exported later
import { toast } from "react-hot-toast";
import { t } from "@/utils/translation";
import { PAYMENT_MODES_STATE, CREATE_PAYMENT_MODE } from "./type";

const initialState: PAYMENT_MODES_STATE = {
  paymentModes: [],
  pagination: {
    page: 1,
    limit: 10,
    numberOfResults: 0,
    numberOfPages: 1,
  },
  loadingPaymentMode: false,
  errorPaymentMode: null,
  createPaymentModeSuccess: false,
  createPaymentModeLoading: false,
  createPaymentModeError: null,
  updatePaymentModeLoading: false,
  updatePaymentModeError: null,
  updatePaymentModeSuccess: false,
  selectedPaymentMode: null,
  getPaymentModeByIdLoading: false,
  getPaymentModeByIdError: null,
};

const paymentModesSlice = createSlice({
  name: "paymentModes",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.createPaymentModeLoading = false;
      state.createPaymentModeError = null;
      state.createPaymentModeSuccess = false;
    },
    resetUpdateState: (state) => {
      state.updatePaymentModeLoading = false;
      state.updatePaymentModeError = null;
      state.updatePaymentModeSuccess = false;
    },
  },
  extraReducers: (builder) => {
    let toastId: any = null;
    // Fetch payment mode list
    builder
      .addCase(fetchPaymentModeList.pending, (state) => {
        state.loadingPaymentMode = true;
        state.errorPaymentMode = null;
      })
      .addCase(
        fetchPaymentModeList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loadingPaymentMode = false;
          state.paymentModes = action.payload.data;
          state.pagination = action.payload?.metadata?.pagination;
        },
      )
      .addCase(fetchPaymentModeList.rejected, (state, action) => {
        state.loadingPaymentMode = false;
        state.errorPaymentMode =
          action.error.message || "Failed to fetch payment modes";
      });

    // Create payment mode
    builder
      .addCase(createPaymentMode.pending, (state) => {
        state.createPaymentModeLoading = true;
        state.createPaymentModeError = null;
        state.createPaymentModeSuccess = false;
        toastId = toast.loading(`Creating payment mode...`);
      })
      .addCase(
        createPaymentMode.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.createPaymentModeLoading = false;
          state.createPaymentModeSuccess = true;
          state.paymentModes.push(action.payload);
          toast.success(t("Payment mode created successfully"), {
            id: toastId,
          });
        },
      )
      .addCase(createPaymentMode.rejected, (state, action) => {
        state.createPaymentModeLoading = false;
        state.createPaymentModeSuccess = false;
        state.createPaymentModeError =
          action.error.message || "Failed to create payment mode";
        toast.error(`${action?.payload || "Failed to create payment mode"}`, {
          id: toastId,
        });
      });

    // Update payment mode
    builder
      .addCase(updatePaymentMode.pending, (state) => {
        state.updatePaymentModeLoading = true;
        state.updatePaymentModeError = null;
        state.updatePaymentModeSuccess = false;
        toastId = toast.loading(`Updating payment mode...`);
      })
      .addCase(
        updatePaymentMode.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.updatePaymentModeLoading = false;
          state.updatePaymentModeSuccess = true;

          state.paymentModes = state.paymentModes.map((paymentMode: any) =>
            paymentMode.id === action.payload.id ? action.payload : paymentMode,
          );

          // Update selectedPaymentMode if it's the same as the updated payment mode
          if (
            state.selectedPaymentMode &&
            state.selectedPaymentMode.id === action.payload.id
          ) {
            state.selectedPaymentMode = action.payload;
          }
          toast.success(t("Payment mode updated successfully"), {
            id: toastId,
          });
        },
      )
      .addCase(updatePaymentMode.rejected, (state, action) => {
        state.updatePaymentModeLoading = false;
        state.updatePaymentModeError =
          action.error.message || "Failed to update payment mode";

        toast.error(`${action?.payload || "Failed to update payment mode"}`, {
          id: toastId,
        });
      });

    // Get payment mode by id
    builder
      .addCase(getPaymentModeById.pending, (state) => {
        state.getPaymentModeByIdLoading = true;
        state.getPaymentModeByIdError = null;
      })
      .addCase(
        getPaymentModeById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getPaymentModeByIdLoading = false;
          state.selectedPaymentMode = action.payload;
        },
      )
      .addCase(getPaymentModeById.rejected, (state, action) => {
        state.getPaymentModeByIdLoading = false;
        state.getPaymentModeByIdError =
          action.error.message || "Failed to fetch payment mode by id";
      });

    // Delete payment mode
    builder
      .addCase(deletePaymentMode.pending, (state) => {
        toastId = toast.loading(`Deleting payment mode...`);
      })
      .addCase(
        deletePaymentMode.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.paymentModes = state.paymentModes.filter(
            (paymentMode: any) => paymentMode.id !== action.payload.id,
          );
          toast.success(t("Payment mode deleted successfully"), {
            id: toastId,
          });
        },
      )
      .addCase(deletePaymentMode.rejected, (state, action) => {
        toast.error(`${action?.payload || "Failed to delete payment mode"}`, {
          id: toastId,
        });
      });
  },
});

// Export actions and reducer
export const { resetCreateState, resetUpdateState } = paymentModesSlice.actions;

export default paymentModesSlice.reducer;

// Export thunks so you can use them in other files
export {
  fetchPaymentModeList,
  createPaymentMode,
  updatePaymentMode,
  deletePaymentMode,
  getPaymentModeById,
};
