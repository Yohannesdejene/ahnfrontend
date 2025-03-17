import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchCompanyList,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanyById,
} from "./companiesThunk";
import { toast } from "react-hot-toast";
import { COMPANIES_STATE, COMPANY } from "./type";

const initialState: COMPANIES_STATE = {
  companies: [],
  currentCompany: null,
  pagination: {
    page: 1,
    limit: 10,
    numberOfResults: 0,
    numberOfPages: 1,
  },
  loadingCompany: false,
  errorCompany: null,
  createCompanySuccess: false,
  createCompanyLoading: false,
  createCompanyError: null,
  updateCompanyLoading: false,
  updateCompanyError: null,
  updateCompanySuccess: false,
  selectedCompany: null,
  getCompanyByIdLoading: false,
  getCompanyByIdError: null,
  deleteCompanyLoading: false,
  deleteCompanyError: null,
  deleteCompanySuccess: false,
};

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.createCompanyLoading = false;
      state.createCompanyError = null;
      state.createCompanySuccess = false;
    },
    resetUpdateState: (state) => {
      state.updateCompanyLoading = false;
      state.updateCompanyError = null;
      state.updateCompanySuccess = false;
    },
  },
  extraReducers: (builder) => {
    let toastId: any = null;

    // Fetch company list
    builder
      .addCase(fetchCompanyList.pending, (state) => {
        state.loadingCompany = true;
        state.errorCompany = null;
      })
      .addCase(
        fetchCompanyList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loadingCompany = false;
          state.companies = action.payload?.data?.companies || [];
          state.pagination =
            action.payload?.metadata?.pagination || initialState.pagination;
        },
      )
      .addCase(fetchCompanyList.rejected, (state, action) => {
        state.loadingCompany = false;
        state.errorCompany =
          action.error.message || "Failed to fetch companies";
      });

    // Create company
    builder
      .addCase(createCompany.pending, (state) => {
        state.createCompanyLoading = true;
        state.createCompanyError = null;
        state.createCompanySuccess = false;
        toastId = toast.loading("Creating company...");
      })
      .addCase(createCompany.fulfilled, (state) => {
        state.createCompanyLoading = false;
        state.createCompanySuccess = true;
        toast.success("Company created successfully!", { id: toastId });
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.createCompanyLoading = false;
        state.createCompanySuccess = false;
        state.createCompanyError =
          action.error.message || "Failed to create company";
        toast.error(state.createCompanyError, { id: toastId });
      });

    // Update company
    builder
      .addCase(updateCompany.pending, (state) => {
        state.updateCompanyLoading = true;
        state.updateCompanyError = null;
        state.updateCompanySuccess = false;
        toastId = toast.loading("Updating company...");
      })
      .addCase(updateCompany.fulfilled, (state, action: PayloadAction<any>) => {
        state.updateCompanyLoading = false;
        state.updateCompanySuccess = true;

        state.companies = state.companies.map((company: COMPANY) =>
          company.id === action.payload.id ? action.payload : company,
        );

        // Update selectedCompany if it's the same as the updated company
        if (
          state.selectedCompany &&
          state.selectedCompany.id === action.payload.id
        ) {
          state.selectedCompany = action.payload;
        }
        toast.success("Company updated successfully!", { id: toastId });
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.updateCompanyLoading = false;
        state.updateCompanyError =
          action.error.message || "Failed to update company";
        toast.error(state.updateCompanyError, { id: toastId });
      });

    // Get company by ID
    builder
      .addCase(getCompanyById.pending, (state) => {
        state.getCompanyByIdLoading = true;
        state.getCompanyByIdError = null;
      })
      .addCase(
        getCompanyById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getCompanyByIdLoading = false;
          state.currentCompany = action.payload?.data?.company || null;
        },
      )
      .addCase(getCompanyById.rejected, (state, action) => {
        state.getCompanyByIdLoading = false;
        state.getCompanyByIdError =
          action.error.message || "Failed to fetch company by ID";
      });

    // Delete company
    builder
      .addCase(deleteCompany.pending, (state) => {
        toastId = toast.loading("Deleting company...");
      })
      .addCase(deleteCompany.fulfilled, (state, action: PayloadAction<any>) => {
        state.companies = state.companies.filter(
          (company: COMPANY) => company.id !== action.payload.id,
        );
        toast.success("Company deleted successfully!", { id: toastId });
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        toast.error(action.error.message || "Failed to delete company", {
          id: toastId,
        });
      });
  },
});

// Export actions and reducer
export const { resetCreateState, resetUpdateState } = companiesSlice.actions;

export default companiesSlice.reducer;

// Export thunks for use in other files
export {
  fetchCompanyList,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanyById,
};
