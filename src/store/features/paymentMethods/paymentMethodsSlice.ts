import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchPaymentMethodList,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  getPaymentMethodById,
} from "./paymentMethodsThunk"; // These need to be exported later
import { toast } from "react-hot-toast";
import { t } from "@/utils/translation";
import { PAYMENT_METHODS_STATE, CREATE_PAYMENT_METHOD } from "./type";

const initialState: PAYMENT_METHODS_STATE = {
  paymentMethods: [],
  currentPaymentMethod: null,
  pagination: {
    page: 1,
    limit: 10,
    numberOfResults: 0,
    numberOfPages: 1,
  },
  loadingPaymentMethod: false,
  errorPaymentMethod: null,
  createPaymentMethodSuccess: false,
  createPaymentMethodLoading: false,
  createPaymentMethodError: null,
  updatePaymentMethodLoading: false,
  updatePaymentMethodError: null,
  updatePaymentMethodSuccess: false,
  selectedPaymentMethod: null,
  getPaymentMethodByIdLoading: false,
  getPaymentMethodByIdError: null,
};

const paymentMethodsSlice = createSlice({
  name: "paymentMethods",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.createPaymentMethodLoading = false;
      state.createPaymentMethodError = null;
      state.createPaymentMethodSuccess = false;
    },
    resetUpdateState: (state) => {
      state.updatePaymentMethodLoading = false;
      state.updatePaymentMethodError = null;
      state.updatePaymentMethodSuccess = false;
    },
  },
  extraReducers: (builder) => {
    let toastId: any = null;
    // Fetch payment method list
    builder
      .addCase(fetchPaymentMethodList.pending, (state) => {
        state.loadingPaymentMethod = true;
        state.errorPaymentMethod = null;
      })
      .addCase(
        fetchPaymentMethodList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loadingPaymentMethod = false;
          state.paymentMethods = action.payload.data?.paymentMethods;
          state.pagination = action.payload?.metadata?.pagination;
        },
      )
      .addCase(fetchPaymentMethodList.rejected, (state, action) => {
        state.loadingPaymentMethod = false;
        state.errorPaymentMethod =
          action.error.message || "Failed to fetch payment methods";
      });

    // Create payment method
    builder
      .addCase(createPaymentMethod.pending, (state) => {
        state.createPaymentMethodLoading = true;
        state.createPaymentMethodError = null;
        state.createPaymentMethodSuccess = false;
        toastId = toast.loading(`Creating payment method...`);
      })
      .addCase(
        createPaymentMethod.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.createPaymentMethodLoading = false;
          state.createPaymentMethodSuccess = true;
          toast.success(t("Payment method created successfully"), {
            id: toastId,
          });
        },
      )
      .addCase(createPaymentMethod.rejected, (state, action) => {
        state.createPaymentMethodLoading = false;
        state.createPaymentMethodSuccess = false;
        state.createPaymentMethodError =
          action.error.message || "Failed to create payment method";
        toast.error(`${action?.payload || "Failed to create payment method"}`, {
          id: toastId,
        });
      });

    // Update payment method
    builder
      .addCase(updatePaymentMethod.pending, (state) => {
        state.updatePaymentMethodLoading = true;
        state.updatePaymentMethodError = null;
        state.updatePaymentMethodSuccess = false;
        toastId = toast.loading(`Updating payment method...`);
      })
      .addCase(
        updatePaymentMethod.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.updatePaymentMethodLoading = false;
          state.updatePaymentMethodSuccess = true;

          state.paymentMethods = state.paymentMethods.map(
            (paymentMethod: any) =>
              paymentMethod.id === action.payload.id
                ? action.payload
                : paymentMethod,
          );

          // Update selectedPaymentMethod if it's the same as the updated payment method
          if (
            state.selectedPaymentMethod &&
            state.selectedPaymentMethod.id === action.payload.id
          ) {
            state.selectedPaymentMethod = action.payload;
          }
          toast.success(t("Payment method updated successfully"), {
            id: toastId,
          });
        },
      )
      .addCase(updatePaymentMethod.rejected, (state, action) => {
        state.updatePaymentMethodLoading = false;
        state.updatePaymentMethodError =
          action.error.message || "Failed to update payment method";

        toast.error(`${action?.payload || "Failed to update payment method"}`, {
          id: toastId,
        });
      });

    // Get payment method by id
    builder
      .addCase(getPaymentMethodById.pending, (state) => {
        state.getPaymentMethodByIdLoading = true;
        state.getPaymentMethodByIdError = null;
      })
      .addCase(
        getPaymentMethodById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getPaymentMethodByIdLoading = false;
          state.currentPaymentMethod = action.payload?.data?.paymentMethods;
        },
      )
      .addCase(getPaymentMethodById.rejected, (state, action) => {
        state.getPaymentMethodByIdLoading = false;
        state.getPaymentMethodByIdError =
          action.error.message || "Failed to fetch payment method by id";
      });

    // Delete payment method
    builder
      .addCase(deletePaymentMethod.pending, (state) => {
        toastId = toast.loading(`Deleting payment method...`);
      })
      .addCase(
        deletePaymentMethod.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.paymentMethods = state.paymentMethods.filter(
            (paymentMethod: any) => paymentMethod.id !== action.payload.id,
          );
          toast.success(t("Payment method deleted successfully"), {
            id: toastId,
          });
        },
      )
      .addCase(deletePaymentMethod.rejected, (state, action) => {
        toast.error(`${action?.payload || "Failed to delete payment method"}`, {
          id: toastId,
        });
      });
  },
});

// Export actions and reducer
export const { resetCreateState, resetUpdateState } =
  paymentMethodsSlice.actions;

export default paymentMethodsSlice.reducer;

// Export thunks so you can use them in other files
export {
  fetchPaymentMethodList,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  getPaymentMethodById,
};
