export interface YEAR {
  id: number; // Change to number
  is_active: boolean;
  EUC_year: string;
  ETH_year: number;
  start_date: string;
  end_date: string;
  created_by: string;
  created_date: string;
  updated_date: string;
}
export interface PAGINATION {
  page: number;
  limit: number;
  numberOfResults: number;
  numberOfPages: number;
}
// Initial state for the courses
export interface YEAR_STATE {
  years: YEAR[];
  pagination: PAGINATION;
  loadingYears: boolean;
  errorYears: string | null;
  createYearSuccess: boolean;
  createYearLoading: boolean;
  createYearError: string | null;
  updateYearLoading: boolean;
  updateYearError: string | null;
  updateYearSuccess: boolean;
  selectedYear: YEAR | null;
  getYearByIdLoading: boolean;
  getYearByIdError: string | null;
}
