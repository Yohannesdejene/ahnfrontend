import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchRoles,
  createRole,
  updateRole,
  deleteRole,
  getRoleById,
} from "./rolesThunk"; // Import role-related thunks
import { toast } from "react-hot-toast";
import { ROLE } from "./type";

interface ROLES_STATE {
  roles: ROLE[];
  currentRole: ROLE | null;
  pagination: {
    page: number;
    limit: number;
    numberOfResults: number;
    numberOfPages: number;
  };
  loadingRole: boolean;
  errorRole: string | null;
  createRoleSuccess: boolean;
  createRoleLoading: boolean;
  createRoleError: string | null;
  updateRoleLoading: boolean;
  updateRoleError: string | null;
  updateRoleSuccess: boolean;
  selectedRole: ROLE | null;
  getRoleByIdLoading: boolean;
  getRoleByIdError: string | null;
}

const initialState: ROLES_STATE = {
  roles: [],
  currentRole: null,
  pagination: {
    page: 1,
    limit: 10,
    numberOfResults: 0,
    numberOfPages: 1,
  },
  loadingRole: false,
  errorRole: null,
  createRoleSuccess: false,
  createRoleLoading: false,
  createRoleError: null,
  updateRoleLoading: false,
  updateRoleError: null,
  updateRoleSuccess: false,
  selectedRole: null,
  getRoleByIdLoading: false,
  getRoleByIdError: null,
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.createRoleLoading = false;
      state.createRoleError = null;
      state.createRoleSuccess = false;
    },
    resetUpdateState: (state) => {
      state.updateRoleLoading = false;
      state.updateRoleError = null;
      state.updateRoleSuccess = false;
    },
  },
  extraReducers: (builder) => {
    let toastId: any = null;

    // Fetch roles
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loadingRole = true;
        state.errorRole = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action: PayloadAction<any>) => {
        state.loadingRole = false;
        state.roles = action.payload.data?.roles;
        state.pagination = action.payload?.metadata?.pagination;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loadingRole = false;
        state.errorRole = action.error.message || "Failed to fetch roles";
      });

    // Create role
    builder
      .addCase(createRole.pending, (state) => {
        state.createRoleLoading = true;
        state.createRoleError = null;
        state.createRoleSuccess = false;
        toastId = toast.loading(`Creating role...`);
      })
      .addCase(createRole.fulfilled, (state, action: PayloadAction<any>) => {
        state.createRoleLoading = false;
        state.createRoleSuccess = true;
        toast.success("Role created successfully", {
          id: toastId,
        });
      })
      .addCase(createRole.rejected, (state, action) => {
        state.createRoleLoading = false;
        state.createRoleSuccess = false;
        state.createRoleError = action.error.message || "Failed to create role";
        toast.error(`${action?.payload || "Failed to create role"}`, {
          id: toastId,
        });
      });

    // Update role
    builder
      .addCase(updateRole.pending, (state) => {
        state.updateRoleLoading = true;
        state.updateRoleError = null;
        state.updateRoleSuccess = false;
        toastId = toast.loading(`Updating role...`);
      })
      .addCase(updateRole.fulfilled, (state, action: PayloadAction<any>) => {
        state.updateRoleLoading = false;
        state.updateRoleSuccess = true;

        state.roles = state.roles.map((role: ROLE) =>
          role.id === action.payload.id ? action.payload : role,
        );

        // Update selectedRole if it's the same as the updated role
        if (state.selectedRole && state.selectedRole.id === action.payload.id) {
          state.selectedRole = action.payload;
        }
        toast.success("Role updated successfully", {
          id: toastId,
        });
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.updateRoleLoading = false;
        state.updateRoleError = action.error.message || "Failed to update role";

        toast.error(`${action?.payload || "Failed to update role"}`, {
          id: toastId,
        });
      });

    // Get role by ID
    builder
      .addCase(getRoleById.pending, (state) => {
        state.getRoleByIdLoading = true;
        state.getRoleByIdError = null;
      })
      .addCase(getRoleById.fulfilled, (state, action: PayloadAction<any>) => {
        state.getRoleByIdLoading = false;
        state.currentRole = action.payload?.data?.role;
      })
      .addCase(getRoleById.rejected, (state, action) => {
        state.getRoleByIdLoading = false;
        state.getRoleByIdError =
          action.error.message || "Failed to fetch role by ID";
      });

    // Delete role
    builder
      .addCase(deleteRole.pending, (state) => {
        toastId = toast.loading(`Deleting role...`);
      })
      .addCase(deleteRole.fulfilled, (state, action: PayloadAction<any>) => {
        state.roles = state.roles.filter(
          (role: ROLE) => role.id !== action.payload.id,
        );
        toast.success("Role deleted successfully", {
          id: toastId,
        });
      })
      .addCase(deleteRole.rejected, (state, action) => {
        toast.error(`${action?.payload || "Failed to delete role"}`, {
          id: toastId,
        });
      });
  },
});

// Export actions and reducer
export const { resetCreateState, resetUpdateState } = rolesSlice.actions;

export default rolesSlice.reducer;

// Export thunks so you can use them in other files
export { fetchRoles, createRole, updateRole, deleteRole, getRoleById };
