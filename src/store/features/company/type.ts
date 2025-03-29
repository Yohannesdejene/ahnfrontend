import { any, z } from "zod";

// Add Company Schema
export const addCompanySchema = z.object({
  name: z.string().max(255, "Name must not exceed 255 characters."),
  phone: z
    .string()
    .regex(/^\d{9,12}$/, "Phone number must be between 9 and 12 digits."),
  email: z
    .string()
    .email("Invalid email address.")
    .max(255, "Email must not exceed 255 characters."),
  tin: z.any().optional(),
  licenseLink: z.any().optional(),
  otherDocumentsLink: z.any().optional(),
  branchId: z.number(),
});

// Update Company Schema
export const updateCompanySchema = z.object({
  name: z.string().optional(),
  tin: z.string().max(255, "TIN must not exceed 255 characters.").optional(),
  licenseLink: z
    .string()
    .url("License link must be a valid URL.")
    .max(255, "License link must not exceed 255 characters.")
    .optional(),
  otherDocumentsLink: z
    .string()
    .url("Other documents link must be a valid URL.")
    .max(255, "Other documents link must not exceed 255 characters.")
    .optional(),
  branchId: z.string().optional(),
  status: z.string().optional(),
});

// Company Interface
export interface COMPANY {
  id: number;
  accountNumber: string;
  name: string;
  phone: string;
  email: string;
  tin: string | null;
  licenseLink: any;
  otherDocumentsLink: any;
  branchId: number | null;
  status: string;
  statusMessage: string | null;
  addedBy: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Companies State Interface
export interface COMPANIES_STATE {
  companies: COMPANY[];
  currentCompany: COMPANY | null;
  pagination: {
    page: number;
    limit: number;
    numberOfResults: number;
    numberOfPages: number;
  };
  loadingCompany: boolean;
  errorCompany: string | null;
  createCompanySuccess: boolean;
  createCompanyLoading: boolean;
  createCompanyError: string | null;
  updateCompanyLoading: boolean;
  updateCompanyError: string | null;
  updateCompanySuccess: boolean;
  selectedCompany: COMPANY | null;
  getCompanyByIdLoading: boolean;
  getCompanyByIdError: string | null;
  deleteCompanyLoading: boolean;
  deleteCompanyError: string | null;
  deleteCompanySuccess: boolean;
  changeStatusLoading: boolean; // New field for status change loading
  changeStatusError: any; // New field for status change error
}

// Infer TypeScript types from the schemas
export type ADD_COMPANY = z.infer<typeof addCompanySchema>;
export type UPDATE_COMPANY = z.infer<typeof updateCompanySchema>;
