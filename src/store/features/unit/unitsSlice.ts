import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchUnitList,
  getUnitById,
  createUnit,
  updateUnit,
  deleteUnit,
} from "./unitsThunk"; // Import thunks for units
import { toast } from "react-hot-toast";
import { t } from "@/utils/translation";
import { UNITS_STATE, CREATE_UNIT } from "./type";

const initialState: UNITS_STATE = {
  units: [],
  currentUnit: null,
  pagination: {
    page: 1,
    limit: 10,
    numberOfResults: 0,
    numberOfPages: 1,
  },
  loadingUnit: false,
  errorUnit: null,
  createUnitSuccess: false,
  createUnitLoading: false,
  createUnitError: null,
  updateUnitLoading: false,
  updateUnitError: null,
  updateUnitSuccess: false,
  selectedUnit: null,
  getUnitByIdLoading: false,
  getUnitByIdError: null,
};

const unitsSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.createUnitLoading = false;
      state.createUnitError = null;
      state.createUnitSuccess = false;
    },
    resetUpdateState: (state) => {
      state.updateUnitLoading = false;
      state.updateUnitError = null;
      state.updateUnitSuccess = false;
    },
  },
  extraReducers: (builder) => {
    let toastId: any = null;

    // Fetch unit list
    builder
      .addCase(fetchUnitList.pending, (state) => {
        state.loadingUnit = true;
        state.errorUnit = null;
      })
      .addCase(fetchUnitList.fulfilled, (state, action: PayloadAction<any>) => {
        state.loadingUnit = false;
        state.units = action.payload.data?.units;
        state.pagination = action.payload?.metadata?.pagination;
      })
      .addCase(fetchUnitList.rejected, (state, action) => {
        state.loadingUnit = false;
        state.errorUnit = action.error.message || "Failed to fetch units";
      });

    // Fetch unit by ID
    builder
      .addCase(getUnitById.pending, (state) => {
        state.getUnitByIdLoading = true;
        state.getUnitByIdError = null;
      })
      .addCase(getUnitById.fulfilled, (state, action: PayloadAction<any>) => {
        state.getUnitByIdLoading = false;
        state.currentUnit = action.payload?.data?.unit;
      })
      .addCase(getUnitById.rejected, (state, action) => {
        state.getUnitByIdLoading = false;
        state.getUnitByIdError =
          action.error.message || "Failed to fetch unit by ID";
      });

    // Create unit
    builder
      .addCase(createUnit.pending, (state) => {
        state.createUnitLoading = true;
        state.createUnitError = null;
        state.createUnitSuccess = false;
        toastId = toast.loading(`Creating unit...`);
      })
      .addCase(createUnit.fulfilled, (state, action: PayloadAction<any>) => {
        state.createUnitLoading = false;
        state.createUnitSuccess = true;
        toast.success(t("Unit created successfully"), {
          id: toastId,
        });
      })
      .addCase(createUnit.rejected, (state, action) => {
        state.createUnitLoading = false;
        state.createUnitSuccess = false;
        state.createUnitError = action.error.message || "Failed to create unit";
        toast.error(`${action?.payload || "Failed to create unit"}`, {
          id: toastId,
        });
      });

    // Update unit
    builder
      .addCase(updateUnit.pending, (state) => {
        state.updateUnitLoading = true;
        state.updateUnitError = null;
        state.updateUnitSuccess = false;
        toastId = toast.loading(`Updating unit...`);
      })
      .addCase(updateUnit.fulfilled, (state, action: PayloadAction<any>) => {
        state.updateUnitLoading = false;
        state.updateUnitSuccess = true;

        state.units = state.units.map((unit: any) =>
          unit.id === action.payload.id ? action.payload : unit,
        );

        // Update selectedUnit if it's the same as the updated unit
        if (state.selectedUnit && state.selectedUnit.id === action.payload.id) {
          state.selectedUnit = action.payload;
        }
        toast.success(t("Unit updated successfully"), {
          id: toastId,
        });
      })
      .addCase(updateUnit.rejected, (state, action) => {
        state.updateUnitLoading = false;
        state.updateUnitError = action.error.message || "Failed to update unit";

        toast.error(`${action?.payload || "Failed to update unit"}`, {
          id: toastId,
        });
      });

    // Delete unit
    builder
      .addCase(deleteUnit.pending, (state) => {
        toastId = toast.loading(`Deleting unit...`);
      })
      .addCase(deleteUnit.fulfilled, (state, action: PayloadAction<any>) => {
        state.units = state.units.filter(
          (unit: any) => unit.id !== action.payload.id,
        );
        toast.success(t("Unit deleted successfully"), {
          id: toastId,
        });
      })
      .addCase(deleteUnit.rejected, (state, action) => {
        toast.error(`${action?.payload || "Failed to delete unit"}`, {
          id: toastId,
        });
      });
  },
});

// Export actions and reducer
export const { resetCreateState, resetUpdateState } = unitsSlice.actions;

export default unitsSlice.reducer;

// Export thunks so you can use them in other files
export { fetchUnitList, createUnit, updateUnit, deleteUnit, getUnitById };
