export interface BRANCHES {
  id: number;
  name: string;
  phone: number;
  email: string;
  location: string;
  latitude: number;
  longitude: number;
  mapLink: string;
  LATA: string;
  description: string;
  code: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
export interface PAGINATION {
  page: number;
  limit: number;
  numberOfResults: number;
  numberOfPages: number;
}
// Initial state for the courses
export interface BRANCHES_STATE {
  branches: BRANCHES[];
  currentBranch: BRANCHES | null;
  pagination: PAGINATION;
  loadingBranch: boolean;
  errorBranch: string | null;
  createBranchSuccess: boolean;
  createBranchLoading: boolean;
  createBranchError: string | null;
  updateBranchLoading: boolean;
  updateBranchError: string | null;
  updateBranchSuccess: boolean;
  selectedBranch: BRANCHES | null;
  getBranchByIdLoading: boolean;
  getBranchByIdError: string | null;
}

export interface CREATE_BRANCH {
  name: string;
  phone: string;
  email?: string;
  location: string;
  latitude?: string;
  longitude?: string;
  mapLink?: string;
  LATA?: string;
  description: string;
  code?: string;
}
