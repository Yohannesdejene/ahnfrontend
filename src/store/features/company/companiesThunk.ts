import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetCompanyList,
  apiCreateCompany,
  apiUpdateCompany,
  apiGetCompanyById,
  apiDeleteCompany,
} from "./companiesApi";
import { CREATE_COMPANY } from "./type";

// Fetch company list thunk
export const fetchCompanyList = createAsyncThunk(
  "companies/fetchCompanyList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetCompanyList();
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch companies",
      );
    }
  },
);

// Create company thunk
export const createCompany = createAsyncThunk(
  "companies/createCompany",
  async (
    { companyData }: { companyData: CREATE_COMPANY },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiCreateCompany(companyData);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to create company",
      );
    }
  },
);

// Update company thunk
export const updateCompany = createAsyncThunk(
  "companies/updateCompany",
  async (
    {
      id,
      companyData,
    }: { id: number | string | null; companyData: CREATE_COMPANY },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiUpdateCompany(id, companyData);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update company",
      );
    }
  },
);

// Get company by ID thunk
export const getCompanyById = createAsyncThunk(
  "companies/getCompanyById",
  async (id: number | string | null, { rejectWithValue }) => {
    try {
      const response = await apiGetCompanyById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch company by ID",
      );
    }
  },
);

// Delete company thunk
export const deleteCompany = createAsyncThunk(
  "companies/deleteCompany",
  async (id: number | string | null, { rejectWithValue }) => {
    try {
      const response = await apiDeleteCompany(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to delete company",
      );
    }
  },
);
