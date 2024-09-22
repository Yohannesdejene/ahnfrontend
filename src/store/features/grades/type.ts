export interface GRADE_CREATE {
  name: string;
}
export interface GRADE_INITIAL_STATE {
  grades: GRADE_CREATE[];
  loadingGrades: boolean;
  errorGrades: string | null;
  createGradeSuccess: boolean;
  createGradeLoading: boolean;
  createGradeError: string | null;
  updateGradeLoading: boolean;
  updateGradeError: string | null;
  updateGradeSuccess: boolean;
  selectedGrade: any | null;
  getGradeByIdLoading: boolean;
  getGradeByIdError: string | null;
}
