import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchStudentsList,
  createStudents,
  updateStudents,
  getStudentsById,
} from "./studentsThunk"; // These need to be exported later
import { toast } from "react-hot-toast";
import { t } from "@/utils/translation";
import {
  STUDENT_CREATE,
  STUDENT_INITIAL_STATE,
  STUDENT,
  PAGINATION,
} from "./type";

const initialState: STUDENT_INITIAL_STATE = {
  students: [],
  pagination: {
    page: 1,
    limit: 10,
    numberOfResults: 0,
    numberOfPages: 1,
  },
  loadingStudents: false,
  errorStudents: null,
  createStudentsSuccess: false,
  createStudentsLoading: false,
  createStudentsError: null,
  updateStudentsLoading: false,
  updateStudentsError: null,
  updateStudentsSuccess: false,
  selectedStudents: null,
  getStudentsByIdLoading: false,
  getStudentsByIdError: null,
  deleteStudentsLoading: false,
  deleteStudentsError: null,
  deleteStudentsSuccess: false,
};

const StudentssSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.createStudentsLoading = false;
      state.createStudentsError = null;
      state.createStudentsSuccess = false;
    },
    resetUpdateState: (state) => {
      state.updateStudentsLoading = false;
      state.updateStudentsError = null;
      state.updateStudentsSuccess = false;
    },
  },
  extraReducers: (builder) => {
    let toastId: any = null;
    // Fetch course list
    builder
      .addCase(fetchStudentsList.pending, (state) => {
        state.loadingStudents = true;
        state.errorStudents = null;
      })
      .addCase(
        fetchStudentsList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loadingStudents = false;
          state.students = action.payload.data;
          state.pagination = action.payload?.metadata?.pagination;
        },
      )
      .addCase(fetchStudentsList.rejected, (state, action) => {
        state.loadingStudents = false;
        state.errorStudents =
          action.error.message || "Failed to fetch Studentss";
      });

    // Create Year
    builder
      .addCase(createStudents.pending, (state) => {
        state.createStudentsLoading = true;
        state.createStudentsError = null;
        state.createStudentsSuccess = false;
        toastId = toast.loading(`${t("Students.creatingStudents")}...`);
      })
      .addCase(
        createStudents.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.createStudentsLoading = false;
          state.createStudentsSuccess = true;
          state.students.push(action.payload);
          toast.success(t("Students.StudentsCreatedSuccessfully"), {
            id: toastId,
          });
        },
      )
      .addCase(createStudents.rejected, (state, action) => {
        state.createStudentsLoading = false;
        state.createStudentsSuccess = false;
        state.createStudentsError =
          action.error.message || "Failed to create Students";
        toast.error(`${action?.payload || "Failed to create Students"}`, {
          id: toastId,
        });
      });

    // Update Year
    builder
      .addCase(updateStudents.pending, (state) => {
        state.updateStudentsLoading = true;
        state.updateStudentsError = null;
        state.updateStudentsSuccess = false;
        toastId = toast.loading(`${t("Students.updatingStudents")}...`);
      })
      .addCase(
        updateStudents.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.updateStudentsLoading = false;
          state.updateStudentsSuccess = true;
          console.log(" action.payload", action.payload);
          state.students = state.students.map((students) =>
            students.id === action.payload.id ? action.payload : students,
          );

          // Update sele   ctedYear if it's the same as the updated year
          if (
            state.selectedStudents &&
            state.selectedStudents.id === action.payload.id
          ) {
            state.selectedStudents = action.payload;
          }
          toast.success(t("Students.StudentsUpdatedSuccessfully"), {
            id: toastId,
          });
        },
      )
      .addCase(updateStudents.rejected, (state, action) => {
        state.updateStudentsLoading = false;
        state.updateStudentsError =
          action.error.message || "Failed to update Students";

        toast.error(`${action?.payload || "Failed to update year"}`, {
          id: toastId,
        });
      });

    ///get course By id
    builder
      .addCase(getStudentsById.pending, (state) => {
        state.getStudentsByIdLoading = true;
        state.getStudentsByIdError = null;
      })
      .addCase(
        getStudentsById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getStudentsByIdLoading = false;
          state.selectedStudents = action.payload;
        },
      )
      .addCase(getStudentsById.rejected, (state, action) => {
        state.getStudentsByIdLoading = false;

        state.getStudentsByIdError =
          action.error.message || "Failed to fetch course";
      });
  },
});

// Export actions and reducer
export const { resetCreateState, resetUpdateState } = StudentssSlice.actions;

export default StudentssSlice.reducer;

// Export thunks so you can use them in other files
export { fetchStudentsList, createStudents, updateStudents, getStudentsById };
