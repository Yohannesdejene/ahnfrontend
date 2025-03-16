import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchRateList,
  createRate,
  updateRate,
  deleteRate,
  getRateById,
} from "./ratesThunk"; // These need to be exported later
import { toast } from "react-hot-toast";
import { t } from "@/utils/translation";
import { RATES_STATE, CREATE_RATE } from "./type";

const initialState: RATES_STATE = {
  rates: [],
  currentRate: null,
  pagination: {
    page: 1,
    limit: 10,
    numberOfResults: 0,
    numberOfPages: 1,
  },
  loadingRate: false,
  errorRate: null,
  createRateSuccess: false,
  createRateLoading: false,
  createRateError: null,
  updateRateLoading: false,
  updateRateError: null,
  updateRateSuccess: false,
  selectedRate: null,
  getRateByIdLoading: false,
  getRateByIdError: null,
};

const ratesSlice = createSlice({
  name: "rates",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.createRateLoading = false;
      state.createRateError = null;
      state.createRateSuccess = false;
    },
    resetUpdateState: (state) => {
      state.updateRateLoading = false;
      state.updateRateError = null;
      state.updateRateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    let toastId: any = null;

    // Fetch rate list
    builder
      .addCase(fetchRateList.pending, (state) => {
        state.loadingRate = true;
        state.errorRate = null;
      })
      .addCase(fetchRateList.fulfilled, (state, action: PayloadAction<any>) => {
        console.log("action.payload", action.payload);
        state.loadingRate = false;
        state.rates = action.payload.data?.rates;
        state.pagination = action.payload?.metadata?.pagination;
      })
      .addCase(fetchRateList.rejected, (state, action) => {
        state.loadingRate = false;
        state.errorRate = action.error.message || "Failed to fetch rates";
      });

    // Create rate
    builder
      .addCase(createRate.pending, (state) => {
        state.createRateLoading = true;
        state.createRateError = null;
        state.createRateSuccess = false;
        toastId = toast.loading(`Creating rate...`);
      })
      .addCase(createRate.fulfilled, (state, action: PayloadAction<any>) => {
        state.createRateLoading = false;
        state.createRateSuccess = true;
        toast.success(t("Rate created successfully"), {
          id: toastId,
        });
      })
      .addCase(createRate.rejected, (state, action) => {
        state.createRateLoading = false;
        state.createRateSuccess = false;
        state.createRateError = action.error.message || "Failed to create rate";
        toast.error(`${action?.payload || "Failed to create rate"}`, {
          id: toastId,
        });
      });

    // Update rate
    builder
      .addCase(updateRate.pending, (state) => {
        state.updateRateLoading = true;
        state.updateRateError = null;
        state.updateRateSuccess = false;
        toastId = toast.loading(`Updating rate...`);
      })
      .addCase(updateRate.fulfilled, (state, action: PayloadAction<any>) => {
        state.updateRateLoading = false;
        state.updateRateSuccess = true;

        state.rates = state.rates.map((rate: any) =>
          rate.id === action.payload.id ? action.payload : rate,
        );

        // Update selectedRate if it's the same as the updated rate
        if (state.selectedRate && state.selectedRate.id === action.payload.id) {
          state.selectedRate = action.payload;
        }
        toast.success(t("Rate updated successfully"), {
          id: toastId,
        });
      })
      .addCase(updateRate.rejected, (state, action) => {
        state.updateRateLoading = false;
        state.updateRateError = action.error.message || "Failed to update rate";

        toast.error(`${action?.payload || "Failed to update rate"}`, {
          id: toastId,
        });
      });

    // Get rate by id
    builder
      .addCase(getRateById.pending, (state) => {
        state.getRateByIdLoading = true;
        state.getRateByIdError = null;
      })
      .addCase(getRateById.fulfilled, (state, action: PayloadAction<any>) => {
        state.getRateByIdLoading = false;
        state.currentRate = action.payload?.data?.rate;
      })
      .addCase(getRateById.rejected, (state, action) => {
        state.getRateByIdLoading = false;
        state.getRateByIdError =
          action.error.message || "Failed to fetch rate by id";
      });

    // Delete rate
    builder
      .addCase(deleteRate.pending, (state) => {
        toastId = toast.loading(`Deleting rate...`);
      })
      .addCase(deleteRate.fulfilled, (state, action: PayloadAction<any>) => {
        state.rates = state.rates.filter(
          (rate: any) => rate.id !== action.payload.id,
        );
        toast.success(t("Rate deleted successfully"), {
          id: toastId,
        });
      })
      .addCase(deleteRate.rejected, (state, action) => {
        toast.error(`${action?.payload || "Failed to delete rate"}`, {
          id: toastId,
        });
      });
  },
});

// Export actions and reducer
export const { resetCreateState, resetUpdateState } = ratesSlice.actions;

export default ratesSlice.reducer;

// Export thunks so you can use them in other files
export { fetchRateList, createRate, updateRate, deleteRate, getRateById };
