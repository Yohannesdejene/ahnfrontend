import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetAllRoles,
  apiCreateRole,
  apiUpdateRole,
  apiGetRoleById,
  apiDeleteRole,
} from "./rolesApi"; // Import your API functions
import { CREATE_ROLE, UPDATE_ROLE } from "./type";

// Fetch all roles thunk
export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetAllRoles();
      return response; // Return the roles list
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);
// Create role thunk
export const createRole = createAsyncThunk(
  "roles/createRole",
  async ({ roleData }: { roleData: CREATE_ROLE }, { rejectWithValue }) => {
    try {
      const response = await apiCreateRole(roleData);
      return response; // Return the created role
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);
// Update role thunk
export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async (
    { id, roleData }: { id: number; roleData: UPDATE_ROLE },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiUpdateRole(id, roleData);
      return response; // Return the updated role
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);
// Get role by ID thunk
export const getRoleById = createAsyncThunk(
  "roles/getRoleById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await apiGetRoleById(id);
      return response; // Return the role details
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Delete role thunk
export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await apiDeleteRole(id);
      return response; // Return the delete confirmation
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);
