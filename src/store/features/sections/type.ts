export interface SECTION_CREATE {
  grade_id: number;
  // "home_room_id":"",
  year_id: number;
  name: string;
}
export interface PAGINATION {
  page: number;
  limit: number;
  numberOfResults: number;
  numberOfPages: number;
}
export interface SECTION {
  id: string;
  grade_id: number;
  home_room_id: null;
  year_id: number;
  name: string;
  grade_name: string;
  created_date: string;
  updated_date: string;
  gradeId: null;
}
export interface SECTION_INITIAL_STATE {
  sections: SECTION[];
  pagination: PAGINATION;
  loadingSections: boolean;
  errorSections: string | null;
  createSectionSuccess: boolean;
  createSectionLoading: boolean;
  createSectionError: string | null;
  updateSectionLoading: boolean;
  updateSectionError: string | null;
  updateSectionSuccess: boolean;
  selectedSection: any | null;
  getSectionByIdLoading: boolean;
  getSectionByIdError: string | null;
  deleteSectionLoading: boolean;
  deleteSectionError: string | null;
  deleteSectionSuccess: boolean;
}
