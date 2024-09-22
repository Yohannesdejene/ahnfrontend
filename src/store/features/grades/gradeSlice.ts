import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchGradeList,
  createGrade,
  updateGrade,
  getGradeById,
} from "./gradeThunk"; // These need to be exported later
import { toast } from "react-hot-toast";
import { t } from "@/utils/translation";
import { GRADE_INITIAL_STATE, GRADE_CREATE } from "./type";

const initialState: GRADE_INITIAL_STATE = {
  grades: [],
  loadingGrades: false,
  errorGrades: null,
  createGradeSuccess: false,
  createGradeLoading: false,
  createGradeError: null,
  updateGradeLoading: false,
  updateGradeError: null,
  updateGradeSuccess: false,
  selectedGrade: null,
  getGradeByIdLoading: false,
  getGradeByIdError: null,
};

const gradeSlice = createSlice({
  name: "grades",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.createGradeLoading = false;
      state.createGradeError = null;
      state.createGradeSuccess = false;
    },
    resetUpdateState: (state) => {
      state.updateGradeLoading = false;
      state.updateGradeError = null;
      state.updateGradeSuccess = false;
    },
  },
  extraReducers: (builder) => {
    let toastId: any = null;
    // Fetch course list
    builder
      .addCase(fetchGradeList.pending, (state) => {
        state.loadingGrades = true;
        state.errorGrades = null;
      })
      .addCase(
        fetchGradeList.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loadingGrades = false;
          state.grades = action.payload;
        },
      )
      .addCase(fetchGradeList.rejected, (state, action) => {
        state.loadingGrades = false;
        state.errorGrades = action.error.message || "Failed to fetch Grades";
      });

    // Create Year
    builder
      .addCase(createGrade.pending, (state) => {
        state.createGradeLoading = true;
        state.createGradeError = null;
        state.createGradeSuccess = false;
        toastId = toast.loading(`${t("grade.creatingGrade")}...`);
      })
      .addCase(createGrade.fulfilled, (state, action: PayloadAction<any>) => {
        state.createGradeLoading = false;
        state.createGradeSuccess = true;
        state.grades.push(action.payload);
        toast.success(t("grade.gradeCreatedSuccessfully"), {
          id: toastId,
        });
      })
      .addCase(createGrade.rejected, (state, action) => {
        state.createGradeLoading = false;
        state.createGradeSuccess = false;
        state.createGradeError =
          action.error.message || "Failed to create Grade";
        toast.error(`${action?.payload || "Failed to create Grade"}`, {
          id: toastId,
        });
      });

    // Update Year
    builder
      .addCase(updateGrade.pending, (state) => {
        state.updateGradeLoading = true;
        state.updateGradeError = null;
        state.updateGradeSuccess = false;
        toastId = toast.loading(`${t("grade.updatingGrade")}...`);
      })
      .addCase(updateGrade.fulfilled, (state, action: PayloadAction<any>) => {
        state.updateGradeLoading = false;
        state.updateGradeSuccess = true;

        state.grades = state.grades.map((grade: any) =>
          grade.id === action.payload.id ? action.payload : grade,
        );

        // Update sele   ctedYear if it's the same as the updated year
        if (
          state.selectedGrade &&
          state.selectedGrade.id === action.payload.id
        ) {
          state.selectedGrade = action.payload;
        }
        toast.success(t("grade.gradeUpdatedSuccessfully"), {
          id: toastId,
        });
      })
      .addCase(updateGrade.rejected, (state, action) => {
        state.updateGradeLoading = false;
        state.updateGradeError =
          action.error.message || "Failed to update grade";

        toast.error(`${action?.payload || "Failed to update grade"}`, {
          id: toastId,
        });
      });

    ///get course By id
    builder
      .addCase(getGradeById.pending, (state) => {
        state.getGradeByIdLoading = true;
        state.getGradeByIdError = null;
      })
      .addCase(getGradeById.fulfilled, (state, action: PayloadAction<any>) => {
        state.getGradeByIdLoading = false;
        state.selectedGrade = action.payload;
      })
      .addCase(getGradeById.rejected, (state, action) => {
        state.getGradeByIdLoading = false;

        state.getGradeByIdError =
          action.error.message || "Failed to fetch course";
      });

    // Delete Semest  er
  },
});

// Export actions and reducer
export const { resetCreateState, resetUpdateState } = gradeSlice.actions;

export default gradeSlice.reducer;

// Export thunks so you can use them in other files
export { fetchGradeList, createGrade, updateGrade, getGradeById };
