import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchCourseList,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseById,
} from "./courseThunk"; // These need to be exported later
import { toast } from "react-hot-toast";
import { t } from "@/utils/translation";

// Initial state for the courses
interface CoursesState {
  courses: any[];
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  createLoading: boolean;
  createError: string | null;
  updateLoading: boolean;
  updateError: string | null;
  updateSuccess: boolean;
  deleteLoading: boolean;
  deleteError: string | null;
  deleteSuccess: boolean;
  selectedCourse: any | null;
  getCourseByIdLoading: boolean;
  getCourseByIdError: string | null;
}

const initialState: CoursesState = {
  courses: [],
  loading: false,
  error: null,
  createSuccess: false,
  createLoading: false,
  createError: null,
  updateLoading: false,
  updateError: null,
  updateSuccess: false,
  deleteLoading: false,
  deleteError: null,
  deleteSuccess: false,
  selectedCourse: null,
  getCourseByIdLoading: false,
  getCourseByIdError: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.createLoading = false;
      state.createError = null;
      state.createSuccess = false;
    },
    resetUpdateState: (state) => {
      state.updateLoading = false;
      state.updateError = null;
      state.updateSuccess = false;
    },
    resetDeleteState: (state) => {
      state.deleteLoading = false;
      state.deleteError = null;
      state.deleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    let toastId: any = null;
    // Fetch course list
    builder
      .addCase(fetchCourseList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCourseList.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.courses = action.payload;
        },
      )
      .addCase(fetchCourseList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch courses";
      });

    // Create course
    builder
      .addCase(createCourse.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
        state.createSuccess = false;
        toastId = toast.loading(`${t("course.creatingCourse")}...`);
      })
      .addCase(createCourse.fulfilled, (state, action: PayloadAction<any>) => {
        state.createLoading = false;
        state.createSuccess = true;
        state.courses.push(action.payload);
        toast.success(t("course.courseCreatedSuccessfully"), {
          id: toastId,
        });
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.createLoading = false;
        state.createSuccess = false;
        state.createError = action.error.message || "Failed to create course";
        toast.error(`${action?.payload || "Failed to create course"}`, {
          id: toastId,
        });
      });

    // Update course
    builder
      .addCase(updateCourse.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateSuccess = false;
        toastId = toast.loading(`${t("course.updatingCourse")}...`);
      })
      .addCase(updateCourse.fulfilled, (state, action: PayloadAction<any>) => {
        state.updateLoading = false;
        state.updateSuccess = true;
        const index = state.courses.findIndex(
          (course) => course.id === action.payload.id,
        );
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
        toast.success(t("course.courseUpdatedSuccessfully"), {
          id: toastId,
        });
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.error.message || "Failed to update course";

        toast.error(`${action?.payload || "Failed to update course"}`, {
          id: toastId,
        });
      });

    ///get course By id
    builder
      .addCase(getCourseById.pending, (state) => {
        state.getCourseByIdLoading = true;
        state.getCourseByIdError = null;
      })
      .addCase(getCourseById.fulfilled, (state, action: PayloadAction<any>) => {
        state.getCourseByIdLoading = false;
        state.selectedCourse = action.payload;
      })
      .addCase(getCourseById.rejected, (state, action) => {
        state.getCourseByIdLoading = false;

        state.getCourseByIdError =
          action.error.message || "Failed to fetch course";
      });

    // Delete course
    builder
      .addCase(deleteCourse.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
        state.deleteSuccess = false;
        toastId = toast.loading(`${t("course.deletingItem")}...`);
      })
      .addCase(deleteCourse.fulfilled, (state, action: PayloadAction<any>) => {
        state.deleteLoading = false;
        state.deleteSuccess = true;
        state.courses = state.courses.filter(
          (course) => course.id !== action.payload.id,
        );
        toast.error(`${t("course.courseItemDeletedSuccessfully")}`, {
          id: toastId,
        });
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        console.log("action", action);
        state.deleteLoading = false;
        state.deleteError = action.error.message || "Failed to delete course";
        toast.error(`${action?.payload || "Failed to delete course"}`, {
          id: toastId,
        });
      });
  },
});

// Export actions and reducer
export const { resetCreateState, resetUpdateState, resetDeleteState } =
  coursesSlice.actions;

export default coursesSlice.reducer;

// Export thunks so you can use them in other files
export {
  fetchCourseList,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseById,
};
