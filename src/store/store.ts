import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./features/courses/courseSlice"; // Import the courses slice reducer
import branchReducer from "./features/branches/branchesSlice"; // Import the courses slice reducer
import semestersReducer from "./features/semesters/semesterSlice"; // Import the courses slice reducer
import gradesReducer from "./features/grades/gradeSlice";
import studentsSlice from "./features/students/studentsSlice";
import sectionsReducer from "./features/sections/sectionsSlice";
import authReducer from "./features/auth/authSlice";
import shipmentType from "./features/shipmentTypes/shipmentTypeSlice";
import shipmentMode from "./features/shipmentModes/shipmentModesSlice";
import paymentMode from "./features/paymentModes/paymentModesSlice";
import paymentMethod from "./features/paymentMethods/paymentMethodsSlice";
import rate from "./features/rates/ratesSlice";
// Import the courses slice reducer
// Configure the Redux store and add the courses reducer
export const store = configureStore({
  reducer: {
    auth: authReducer,
    shipmentType: shipmentType,
    shipmentMode: shipmentMode,
    paymentMode: paymentMode,
    paymentMethod: paymentMethod,
    rate: rate,
    courses: coursesReducer, // Attach courses reducer to the store
    branches: branchReducer,
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
