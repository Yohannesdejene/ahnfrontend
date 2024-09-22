export interface SEMESTER_CREATE {
  year_id: string;
  name: string;
  starting_date: string;
  end_date: string;
  status: "Active" | "NotActive";
}
export interface SEMESTER_INITIAL_STATE {
  semesters: any[];
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
