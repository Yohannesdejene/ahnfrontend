import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchUserList,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from "./usersThunk"; // Import user-related thunks
import { toast } from "react-hot-toast";
import { USER } from "./type";

interface USERS_STATE {
  users: USER[];
  currentUser: USER | null;
  pagination: {
    page: number;
    limit: number;
    numberOfResults: number;
    numberOfPages: number;
  };
  loadingUser: boolean;
  errorUser: string | null;
  createUserSuccess: boolean;
  createUserLoading: boolean;
  createUserError: string | null;
  updateUserLoading: boolean;
  updateUserError: string | null;
  updateUserSuccess: boolean;
  selectedUser: USER | null;
  getUserByIdLoading: boolean;
  getUserByIdError: string | null;
}

const initialState: USERS_STATE = {
  users: [],
  currentUser: null,
  pagination: {
    page: 1,
    limit: 10,
    numberOfResults: 0,
    numberOfPages: 1,
  },
  loadingUser: false,
  errorUser: null,
  createUserSuccess: false,
  createUserLoading: false,
  createUserError: null,
  updateUserLoading: false,
  updateUserError: null,
  updateUserSuccess: false,
  selectedUser: null,
  getUserByIdLoading: false,
  getUserByIdError: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.createUserLoading = false;
      state.createUserError = null;
      state.createUserSuccess = false;
    },
    resetUpdateState: (state) => {
      state.updateUserLoading = false;
      state.updateUserError = null;
      state.updateUserSuccess = false;
    },
  },
  extraReducers: (builder) => {
    let toastId: any = null;

    // Fetch user list
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.loadingUser = true;
        state.errorUser = null;
      })
      .addCase(fetchUserList.fulfilled, (state, action: PayloadAction<any>) => {
        state.loadingUser = false;
        state.users = action.payload.data?.users;
        state.pagination = action.payload?.metadata?.pagination;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.loadingUser = false;
        state.errorUser = action.error.message || "Failed to fetch users";
      });

    // Create user
    builder
      .addCase(createUser.pending, (state) => {
        state.createUserLoading = true;
        state.createUserError = null;
        state.createUserSuccess = false;
        toastId = toast.loading(`Creating user...`);
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.createUserLoading = false;
        state.createUserSuccess = true;
        toast.success("User created successfully", {
          id: toastId,
        });
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createUserLoading = false;
        state.createUserSuccess = false;
        state.createUserError = action.error.message || "Failed to create user";
        toast.error(`${action?.payload || "Failed to create user"}`, {
          id: toastId,
        });
      });

    // Update user
    builder
      .addCase(updateUser.pending, (state) => {
        state.updateUserLoading = true;
        state.updateUserError = null;
        state.updateUserSuccess = false;
        toastId = toast.loading(`Updating user...`);
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.updateUserLoading = false;
        state.updateUserSuccess = true;

        state.users = state.users.map((user: USER) =>
          user.id === action.payload.id ? action.payload : user,
        );

        // Update selectedUser if it's the same as the updated user
        if (state.selectedUser && state.selectedUser.id === action.payload.id) {
          state.selectedUser = action.payload;
        }
        toast.success("User updated successfully", {
          id: toastId,
        });
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserLoading = false;
        state.updateUserError = action.error.message || "Failed to update user";

        toast.error(`${action?.payload || "Failed to update user"}`, {
          id: toastId,
        });
      });

    // Get user by ID
    builder
      .addCase(getUserById.pending, (state) => {
        state.getUserByIdLoading = true;
        state.getUserByIdError = null;
      })
      .addCase(getUserById.fulfilled, (state, action: PayloadAction<any>) => {
        state.getUserByIdLoading = false;
        state.currentUser = action.payload?.data?.user;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.getUserByIdLoading = false;
        state.getUserByIdError =
          action.error.message || "Failed to fetch user by ID";
      });

    // Delete user
    builder
      .addCase(deleteUser.pending, (state) => {
        toastId = toast.loading(`Deleting user...`);
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.users = state.users.filter(
          (user: USER) => user.id !== action.payload.id,
        );
        toast.success("User deleted successfully", {
          id: toastId,
        });
      })
      .addCase(deleteUser.rejected, (state, action) => {
        toast.error(`${action?.payload || "Failed to delete user"}`, {
          id: toastId,
        });
      });
  },
});

// Export actions and reducer
export const { resetCreateState, resetUpdateState } = usersSlice.actions;

export default usersSlice.reducer;

// Export thunks so you can use them in other files
export { fetchUserList, createUser, updateUser, deleteUser, getUserById };
