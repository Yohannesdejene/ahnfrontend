export interface STUDENT_CREATE {
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: number;
  department: string;
  father_name: string;
  father_phone: number;
  sex: string;
  nationality: string;
  status: string;
  houseNo: number;
  kebele: number;
  subcity: string;
  prev_school: string;
  age: number;
}
export interface PAGINATION {
  page: number;
  limit: number;
  numberOfResults: number;
  numberOfPages: number;
}
export interface STUDENT {
  id: string;
  user_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: number;
  age: number;
  sex: string;
  nationality: string;
  subcity: string;
  kebele: number;
  houseNo: number;
  prev_school: string;
  parent_id: string;
  department: string;
  created_date: string;
  updated_date: string;
}
export interface STUDENT_INITIAL_STATE {
  semesters: STUDENT[];
  pagination: PAGINATION;
  loadingStudents: boolean;
  errorStudents: string | null;
  createStudentsSuccess: boolean;
  createStudentsLoading: boolean;
  createStudentsError: string | null;
  updateStudentsLoading: boolean;
  updateStudentsError: string | null;
  updateStudentsSuccess: boolean;
  selectedStudents: any | null;
  getStudentsByIdLoading: boolean;
  getStudentsByIdError: string | null;
  deleteStudentsLoading: boolean;
  deleteStudentsError: string | null;
  deleteStudentsSuccess: boolean;
}
