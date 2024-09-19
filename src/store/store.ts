import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./features/courses/courseSlice"; // Import the courses slice reducer

// Configure the Redux store and add the courses reducer
export const store = configureStore({
  reducer: {
    courses: coursesReducer, // Attach courses reducer to the store
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {courses: CoursesState}
export type AppDispatch = typeof store.dispatch;
