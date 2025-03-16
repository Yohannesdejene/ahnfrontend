import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetBranchList,
  apiCreateBranch,
  apiUpdateBranch,
  apiGetBranchById,
  apiDeleteBranch,
} from "./branchesApi";
import { CREATE_BRANCH } from "./type";

// Fetch branch list thunk
export const fetchBranchList = createAsyncThunk(
  "branches/fetchBranchList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetBranchList();
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Create branch thunk
export const createBranch = createAsyncThunk(
  "branches/createBranch",
  async (
    { branchData }: { branchData: CREATE_BRANCH },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiCreateBranch(branchData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Update branch thunk
export const updateBranch = createAsyncThunk(
  "branches/updateBranch",
  async (
    {
      id,
      branchData,
    }: { id: number | string | null; branchData: CREATE_BRANCH },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiUpdateBranch(id, branchData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Get branch by id thunk
export const getBranchById = createAsyncThunk(
  "branches/getBranchById",
  async (id: number | string | null, { rejectWithValue }) => {
    try {
      const response = await apiGetBranchById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Delete branch thunk
export const deleteBranch = createAsyncThunk(
  "branches/deleteBranch",
  async (id: number | string | null, { rejectWithValue }) => {
    try {
      const response = await apiDeleteBranch(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);
