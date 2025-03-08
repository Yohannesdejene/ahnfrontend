import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./features/courses/courseSlice"; // Import the courses slice reducer
import yearsReducer from "./features/years/yearsSlice"; // Import the courses slice reducer
import semestersReducer from "./features/semesters/semesterSlice"; // Import the courses slice reducer
import gradesReducer from "./features/grades/gradeSlice";
import studentsSlice from "./features/students/studentsSlice";
import sectionsReducer from "./features/sections/sectionsSlice";
import authReducer from "./authReducer";
// Import the courses slice reducer
// Configure the Redux store and add the courses reducer
export const store = configureStore({
  reducer: {
    user: authReducer,
    courses: coursesReducer, // Attach courses reducer to the store
    years: yearsReducer,
    semesters: semestersReducer,
    grades: gradesReducer,
    students: studentsSlice,
    sections: sectionsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {courses: CoursesState}
export type AppDispatch = typeof store.dispatch;
