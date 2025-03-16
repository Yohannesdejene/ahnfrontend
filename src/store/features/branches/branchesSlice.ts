import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchBranchList,
  createBranch,
  updateBranch,
  deleteBranch,
  getBranchById,
} from "./branchesThunk"; // These need to be exported later
import { toast } from "react-hot-toast";
import { t } from "@/utils/translation";
import { BRANCHES_STATE, CREATE_BRANCH } from "./type";

const initialState: BRANCHES_STATE = {
  branches: [],
  currentBranch: null,
  pagination: {
    page: 1,
    limit: 10,
    numberOfResults: 0,
    numberOfPages: 1,
  },
  loadingBranch: false,
  errorBranch: null,
  createBranchSuccess: false,
  createBranchLoading: false,
  createBranchError: null,
  updateBranchLoading: false,
  updateBranchError: null,
  updateBranchSuccess: false,
  selectedBranch: null,
  getBranchByIdLoading: false,
  getBranchByIdError: null,
};

const branchesSlice = createSlice({
  name: "branches",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.createBranchLoading = false;
      state.createBranchError = null;
      state.createBranchSuccess = false;
    },
    resetUpdateState: (state) => {
      state.updateBranchLoading = false;
      state.updateBranchError = null;
      state.updateBranchSuccess = false;
    },
  },
  extraReducers: (builder) => {
    let toastId: any = null;

    // Fetch branch list
    builder
      .addCase(fetchBranchList.pending, (state) => {
        state.loadingBranch = true;
        state.errorBranch = null;
      })
      .addCase(
        fetchBranchList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loadingBranch = false;
          state.branches = action.payload.data?.branches;
          state.pagination = action.payload?.metadata?.pagination;
        },
      )
      .addCase(fetchBranchList.rejected, (state, action) => {
        state.loadingBranch = false;
        state.errorBranch = action.error.message || "Failed to fetch branches";
      });

    // Create branch
    builder
      .addCase(createBranch.pending, (state) => {
        state.createBranchLoading = true;
        state.createBranchError = null;
        state.createBranchSuccess = false;
        toastId = toast.loading(`Creating branch...`);
      })
      .addCase(createBranch.fulfilled, (state, action: PayloadAction<any>) => {
        state.createBranchLoading = false;
        state.createBranchSuccess = true;
        toast.success(t("Branch created successfully"), {
          id: toastId,
        });
      })
      .addCase(createBranch.rejected, (state, action) => {
        state.createBranchLoading = false;
        state.createBranchSuccess = false;
        state.createBranchError =
          action.error.message || "Failed to create branch";
        toast.error(`${action?.payload || "Failed to create branch"}`, {
          id: toastId,
        });
      });

    // Update branch
    builder
      .addCase(updateBranch.pending, (state) => {
        state.updateBranchLoading = true;
        state.updateBranchError = null;
        state.updateBranchSuccess = false;
        toastId = toast.loading(`Updating branch...`);
      })
      .addCase(updateBranch.fulfilled, (state, action: PayloadAction<any>) => {
        state.updateBranchLoading = false;
        state.updateBranchSuccess = true;

        state.branches = state.branches.map((branch: any) =>
          branch.id === action.payload.id ? action.payload : branch,
        );

        // Update selectedBranch if it's the same as the updated branch
        if (
          state.selectedBranch &&
          state.selectedBranch.id === action.payload.id
        ) {
          state.selectedBranch = action.payload;
        }
        toast.success(t("Branch updated successfully"), {
          id: toastId,
        });
      })
      .addCase(updateBranch.rejected, (state, action) => {
        state.updateBranchLoading = false;
        state.updateBranchError =
          action.error.message || "Failed to update branch";

        toast.error(`${action?.payload || "Failed to update branch"}`, {
          id: toastId,
        });
      });

    // Get branch by id
    builder
      .addCase(getBranchById.pending, (state) => {
        state.getBranchByIdLoading = true;
        state.getBranchByIdError = null;
      })
      .addCase(getBranchById.fulfilled, (state, action: PayloadAction<any>) => {
        state.getBranchByIdLoading = false;
        state.currentBranch = action.payload?.data?.branch;
      })
      .addCase(getBranchById.rejected, (state, action) => {
        state.getBranchByIdLoading = false;
        state.getBranchByIdError =
          action.error.message || "Failed to fetch branch by id";
      });

    // Delete branch
    builder
      .addCase(deleteBranch.pending, (state) => {
        toastId = toast.loading(`Deleting branch...`);
      })
      .addCase(deleteBranch.fulfilled, (state, action: PayloadAction<any>) => {
        state.branches = state.branches.filter(
          (branch: any) => branch.id !== action.payload.id,
        );
        toast.success(t("Branch deleted successfully"), {
          id: toastId,
        });
      })
      .addCase(deleteBranch.rejected, (state, action) => {
        toast.error(`${action?.payload || "Failed to delete branch"}`, {
          id: toastId,
        });
      });
  },
});

// Export actions and reducer
export const { resetCreateState, resetUpdateState } = branchesSlice.actions;

export default branchesSlice.reducer;

// Export thunks so you can use them in other files
export {
  fetchBranchList,
  createBranch,
  updateBranch,
  deleteBranch,
  getBranchById,
};
