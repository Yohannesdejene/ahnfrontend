import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchYearList,
  createYear,
  updateYear,
  getYearById,
} from "./yearsThunk"; // These need to be exported later
import { toast } from "react-hot-toast";
import { t } from "@/utils/translation";

// Initial state for the courses
interface YearState {
  years: any[];
  loadingYears: boolean;
  errorYears: string | null;
  createYearSuccess: boolean;
  createYearLoading: boolean;
  createYearError: string | null;
  updateYearLoading: boolean;
  updateYearError: string | null;
  updateYearSuccess: boolean;
  selectedYear: any | null;
  getYearByIdLoading: boolean;
  getYearByIdError: string | null;
}

const initialState: YearState = {
  years: [],
  loadingYears: false,
  errorYears: null,
  createYearSuccess: false,
  createYearLoading: false,
  createYearError: null,
  updateYearLoading: false,
  updateYearError: null,
  updateYearSuccess: false,

  selectedYear: null,
  getYearByIdLoading: false,
  getYearByIdError: null,
};

const yearsSlice = createSlice({
  name: "years",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.createYearLoading = false;
      state.createYearError = null;
      state.createYearSuccess = false;
    },
    resetUpdateState: (state) => {
      state.updateYearLoading = false;
      state.updateYearError = null;
      state.updateYearSuccess = false;
    },
  },
  extraReducers: (builder) => {
    let toastId: any = null;
    // Fetch course list
    builder
      .addCase(fetchYearList.pending, (state) => {
        state.loadingYears = true;
        state.errorYears = null;
      })
      .addCase(
        fetchYearList.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loadingYears = false;
          state.years = action.payload;
        },
      )
      .addCase(fetchYearList.rejected, (state, action) => {
        state.loadingYears = false;
        state.errorYears = action.error.message || "Failed to fetch Years";
      });

    // Create Year
    builder
      .addCase(createYear.pending, (state) => {
        state.createYearLoading = true;
        state.createYearError = null;
        state.createYearSuccess = false;
        toastId = toast.loading(`${t("year.creatingYear")}...`);
      })
      .addCase(createYear.fulfilled, (state, action: PayloadAction<any>) => {
        state.createYearLoading = false;
        state.createYearSuccess = true;
        state.years.push(action.payload);
        toast.success(t("year.yearCreatedSuccessfully"), {
          id: toastId,
        });
      })
      .addCase(createYear.rejected, (state, action) => {
        state.createYearLoading = false;
        state.createYearSuccess = false;
        state.createYearError = action.error.message || "Failed to create Year";
        toast.error(`${action?.payload || "Failed to create Year"}`, {
          id: toastId,
        });
      });

    // Update Year
    builder
      .addCase(updateYear.pending, (state) => {
        state.updateYearLoading = true;
        state.updateYearError = null;
        state.updateYearSuccess = false;
        toastId = toast.loading(`${t("year.updatingYear")}...`);
      })
      .addCase(updateYear.fulfilled, (state, action: PayloadAction<any>) => {
        state.updateYearLoading = false;
        state.updateYearSuccess = true;

        state.years = state.years.map((year) =>
          year.id === action.payload.id ? action.payload : year,
        );

        // Update selectedYear if it's the same as the updated year
        if (state.selectedYear && state.selectedYear.id === action.payload.id) {
          state.selectedYear = action.payload;
        }
        toast.success(t("year.yearUpdatedSuccessfully"), {
          id: toastId,
        });
      })
      .addCase(updateYear.rejected, (state, action) => {
        state.updateYearLoading = false;
        state.updateYearError = action.error.message || "Failed to update year";

        toast.error(`${action?.payload || "Failed to update year"}`, {
          id: toastId,
        });
      });

    ///get course By id
    builder
      .addCase(getYearById.pending, (state) => {
        state.getYearByIdLoading = true;
        state.getYearByIdError = null;
      })
      .addCase(getYearById.fulfilled, (state, action: PayloadAction<any>) => {
        state.getYearByIdLoading = false;
        state.selectedYear = action.payload;
      })
      .addCase(getYearById.rejected, (state, action) => {
        state.getYearByIdLoading = false;

        state.getYearByIdError =
          action.error.message || "Failed to fetch course";
      });

    // Delete course
  },
});

// Export actions and reducer
export const { resetCreateState, resetUpdateState } = yearsSlice.actions;

export default yearsSlice.reducer;

// Export thunks so you can use them in other files
export { fetchYearList, createYear, updateYear, getYearById };
