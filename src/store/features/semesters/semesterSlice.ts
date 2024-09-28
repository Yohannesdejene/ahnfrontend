import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchSemesterList,
  createSemester,
  updateSemester,
  getSemesterById,
  deleteSemester,
} from "./semesterThunk"; // These need to be exported later
import { toast } from "react-hot-toast";
import { t } from "@/utils/translation";
import {
  SEMESTER_CREATE,
  SEMESTER_INITIAL_STATE,
  SEMESTER,
  PAGINATION,
} from "./type";

const initialState: SEMESTER_INITIAL_STATE = {
  semesters: [],
  pagination: {
    page: 1,
    limit: 10,
    numberOfResults: 0,
    numberOfPages: 1,
  },
  loadingSemesters: false,
  errorSemesters: null,
  createSemesterSuccess: false,
  createSemesterLoading: false,
  createSemesterError: null,
  updateSemesterLoading: false,
  updateSemesterError: null,
  updateSemesterSuccess: false,
  selectedSemester: null,
  getSemesterByIdLoading: false,
  getSemesterByIdError: null,
  deleteSemesterLoading: false,
  deleteSemesterError: null,
  deleteSemesterSuccess: false,
};

const semestersSlice = createSlice({
  name: "semesters",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.createSemesterLoading = false;
      state.createSemesterError = null;
      state.createSemesterSuccess = false;
    },
    resetUpdateState: (state) => {
      state.updateSemesterLoading = false;
      state.updateSemesterError = null;
      state.updateSemesterSuccess = false;
    },
  },
  extraReducers: (builder) => {
    let toastId: any = null;
    // Fetch course list
    builder
      .addCase(fetchSemesterList.pending, (state) => {
        state.loadingSemesters = true;
        state.errorSemesters = null;
      })
      .addCase(
        fetchSemesterList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loadingSemesters = false;
          state.semesters = action.payload.data;
          state.pagination = action.payload?.metadata?.pagination;
        },
      )
      .addCase(fetchSemesterList.rejected, (state, action) => {
        state.loadingSemesters = false;
        state.errorSemesters =
          action.error.message || "Failed to fetch Semesters";
      });

    // Create Year
    builder
      .addCase(createSemester.pending, (state) => {
        state.createSemesterLoading = true;
        state.createSemesterError = null;
        state.createSemesterSuccess = false;
        toastId = toast.loading(`${t("semester.creatingSemester")}...`);
      })
      .addCase(
        createSemester.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.createSemesterLoading = false;
          state.createSemesterSuccess = true;
          state.semesters.push(action.payload);
          toast.success(t("semester.semesterCreatedSuccessfully"), {
            id: toastId,
          });
        },
      )
      .addCase(createSemester.rejected, (state, action) => {
        state.createSemesterLoading = false;
        state.createSemesterSuccess = false;
        state.createSemesterError =
          action.error.message || "Failed to create Semester";
        toast.error(`${action?.payload || "Failed to create Semester"}`, {
          id: toastId,
        });
      });

    // Update Year
    builder
      .addCase(updateSemester.pending, (state) => {
        state.updateSemesterLoading = true;
        state.updateSemesterError = null;
        state.updateSemesterSuccess = false;
        toastId = toast.loading(`${t("semester.updatingSemester")}...`);
      })
      .addCase(
        updateSemester.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.updateSemesterLoading = false;
          state.updateSemesterSuccess = true;
          console.log(" action.payload", action.payload);
          state.semesters = state.semesters.map((semester) =>
            semester.id === action.payload.id ? action.payload : semester,
          );

          // Update sele   ctedYear if it's the same as the updated year
          if (
            state.selectedSemester &&
            state.selectedSemester.id === action.payload.id
          ) {
            state.selectedSemester = action.payload;
          }
          toast.success(t("semester.semesterUpdatedSuccessfully"), {
            id: toastId,
          });
        },
      )
      .addCase(updateSemester.rejected, (state, action) => {
        state.updateSemesterLoading = false;
        state.updateSemesterError =
          action.error.message || "Failed to update semester";

        toast.error(`${action?.payload || "Failed to update year"}`, {
          id: toastId,
        });
      });

    ///get course By id
    builder
      .addCase(getSemesterById.pending, (state) => {
        state.getSemesterByIdLoading = true;
        state.getSemesterByIdError = null;
      })
      .addCase(
        getSemesterById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getSemesterByIdLoading = false;
          state.selectedSemester = action.payload;
        },
      )
      .addCase(getSemesterById.rejected, (state, action) => {
        state.getSemesterByIdLoading = false;

        state.getSemesterByIdError =
          action.error.message || "Failed to fetch course";
      });

    // Delete Semest  er
    builder
      .addCase(deleteSemester.pending, (state) => {
        state.deleteSemesterLoading = true;
        state.deleteSemesterError = null;
        state.deleteSemesterSuccess = false;
        toastId = toast.loading(`${t("semester.deletingSemester")}...`);
      })
      .addCase(
        deleteSemester.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.deleteSemesterLoading = false;
          state.deleteSemesterSuccess = true;
          state.semesters = state.semesters.filter(
            (semester) => semester.id !== action.payload.id,
          );
          toast.success(t("semester.semesterDeletedSuccessfully"), {
            id: toastId,
          });
        },
      )
      .addCase(deleteSemester.rejected, (state, action) => {
        state.deleteSemesterLoading = false;
        state.deleteSemesterError =
          action.error.message || "Failed to delete semester";
        toast.error(`${action?.payload || "Failed to delete semester"}`, {
          id: toastId,
        });
      });
  },
});

// Export actions and reducer
export const { resetCreateState, resetUpdateState } = semestersSlice.actions;

export default semestersSlice.reducer;

// Export thunks so you can use them in other files
export {
  fetchSemesterList,
  createSemester,
  updateSemester,
  getSemesterById,
  deleteSemester,
};
