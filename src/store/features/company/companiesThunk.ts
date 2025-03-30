import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetCompanyList,
  apiGetAllCompanyList,
  apiCreateCompany,
  apiUpdateCompany,
  apiGetCompanyById,
  apiDeleteCompany,
  apiChangeCompanyStatusCompany,
  apiChangeCompanyEmailOrPhoneCompany,
} from "./companiesApi";
import { ADD_COMPANY, UPDATE_COMPANY } from "./type";

// Fetch all active companies
export const fetchActiveCompanies = createAsyncThunk(
  "companies/fetchActiveCompanies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetCompanyList();
      return response; // Return the list of active companies
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Fetch all companies (active and inactive)
export const fetchAllCompanies = createAsyncThunk(
  "companies/fetchAllCompanies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetAllCompanyList();
      return response; // Return the list of all companies
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Create a new company
export const createCompany = createAsyncThunk(
  "companies/createCompany",
  async ({ companyData }: { companyData: any }, { rejectWithValue }) => {
    try {
      const response = await apiCreateCompany(companyData);
      return response; // Return the created company
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Update an existing company
export const updateCompany = createAsyncThunk(
  "companies/updateCompany",
  async (
    { id, companyData }: { id: number | string; companyData: any },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiUpdateCompany(id, companyData);
      return response; // Return the updated company
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Get a company by ID
export const getCompanyById = createAsyncThunk(
  "companies/getCompanyById",
  async (id: number | string | null, { rejectWithValue }) => {
    try {
      const response = await apiGetCompanyById(id);
      return response; // Return the company details
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Delete a company
export const deleteCompany = createAsyncThunk(
  "companies/deleteCompany",
  async (id: number | string | null, { rejectWithValue }) => {
    try {
      const response = await apiDeleteCompany(id);
      return response; // Return the delete confirmation
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Change company status
// Change company status
export const changeCompanyStatus = createAsyncThunk(
  "companies/changeCompanyStatus",
  async (
    { id, status }: { id: number | string; status: string },
    { rejectWithValue },
  ) => {
    try {
      // Call the API to change the company status
      const response = await apiChangeCompanyStatusCompany(id, { status });
      return response.data; // Return the updated company data
    } catch (error: any) {
      // Handle errors and return a rejected value
      return rejectWithValue(
        error?.response?.data?.message || "Failed to change company status",
      );
    }
  },
);

// Change company email or phone
export const changeCompanyEmailOrPhone = createAsyncThunk(
  "companies/changeCompanyEmailOrPhone",
  async (id: number | string | null, { rejectWithValue }) => {
    try {
      const response = await apiChangeCompanyEmailOrPhoneCompany(id);
      return response; // Return the email/phone change confirmation
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);
