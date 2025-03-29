import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetUserList,
  apiCreateUser,
  apiUpdateUser,
  apiGetUserById,
  apiDeleteUser,
} from "./usersApi"; // Import your API functions
import { CREATE_USER, UPDATE_USER } from "./type";

// Fetch user list thunk
export const fetchUserList = createAsyncThunk(
  "users/fetchUserList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetUserList();
      return response; // Return the user list
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Create user thunk
export const createUser = createAsyncThunk(
  "users/createUser",
  async ({ userData }: { userData: CREATE_USER }, { rejectWithValue }) => {
    try {
      const response = await apiCreateUser(userData);
      return response; // Return the created user
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Update user thunk
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (
    { id, userData }: { id: number | string | null; userData: UPDATE_USER },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiUpdateUser(id, userData);
      return response; // Return the updated user
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Get user by ID thunk
export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (id: number | string | null, { rejectWithValue }) => {
    try {
      const response = await apiGetUserById(id);
      return response; // Return the user details
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Delete user thunk
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: number | string | null, { rejectWithValue }) => {
    try {
      const response = await apiDeleteUser(id);
      return response; // Return the delete confirmation
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);
