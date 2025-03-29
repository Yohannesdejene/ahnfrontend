import { configureStore } from "@reduxjs/toolkit";
import branchReducer from "./features/branches/branchesSlice"; // Import the courses slice reducer

import authReducer from "./features/auth/authSlice";
import shipmentType from "./features/shipmentTypes/shipmentTypeSlice";
import shipmentMode from "./features/shipmentModes/shipmentModesSlice";
import paymentMode from "./features/paymentModes/paymentModesSlice";
import paymentMethod from "./features/paymentMethods/paymentMethodsSlice";
import rate from "./features/rates/ratesSlice";
import unit from "./features/unit/unitsSlice";
import shipment from "./features/shipments/shipmentslice";
import user from "./features/user/usersSlice";
import company from "./features/company/companiesSlice";
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
    unit: unit,
    shipment: shipment,
    branches: branchReducer,
    user: user,
    company: company,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {courses: CoursesState}
export type AppDispatch = typeof store.dispatch;
