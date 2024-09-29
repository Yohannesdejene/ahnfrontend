export interface SEMESTER_CREATE {
  year_id: string;
  name: string;
  starting_date: string;
  end_date: string;
  status: "Active" | "NotActive";
}
export interface PAGINATION {
  page: number;
  limit: number;
  numberOfResults: number;
  numberOfPages: number;
}
export interface SEMESTER {
  id: number;
  year_id: string;
  name: string;
  starting_date: string;
  end_date: string;
  status: "Active" | "NotActive";
  access_right: string;
  created_date: string;
  updated_date: string;
}
export interface SEMESTER_INITIAL_STATE {
  semesters: SEMESTER[];
  pagination: PAGINATION;
  loadingSemesters: boolean;
  errorSemesters: string | null;
  createSemesterSuccess: boolean;
  createSemesterLoading: boolean;
  createSemesterError: string | null;
  updateSemesterLoading: boolean;
  updateSemesterError: string | null;
  updateSemesterSuccess: boolean;
  selectedSemester: any | null;
  getSemesterByIdLoading: boolean;
  getSemesterByIdError: string | null;
  deleteSemesterLoading: boolean;
  deleteSemesterError: string | null;
  deleteSemesterSuccess: boolean;
}
