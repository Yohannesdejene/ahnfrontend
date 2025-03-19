// Interface for a single company
export interface COMPANY {
  id: number;
  accountNumber: string;
  name: string;
  phone: string;
  email: string;
  tin: string;
  licenseLink: string | null;
  otherDocumentsLink: string | null;
  branchId: number;
  status: string;
  statusMessage: string;
  addedBy: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Interface for creating a company
export interface CREATE_COMPANY {
  name: string;
  phone: string;
  email: string;
  tin: string;
  licenseLink: string;
  otherDocumentsLink: string;
  branchId: number;
  status: string;
  addedBy: string;
}

// Interface for pagination
export interface PAGINATION {
  page: number;
  limit: number;
  numberOfResults: number;
  numberOfPages: number;
}

// Initial state for companies
export interface COMPANIES_STATE {
  companies: COMPANY[];
  currentCompany: COMPANY | null;
  pagination: PAGINATION;
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
}