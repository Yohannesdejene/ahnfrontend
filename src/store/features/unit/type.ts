// Interface for a single unit
export interface UNIT {
  id: number;
  code: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Interface for creating a unit
export interface CREATE_UNIT {
  code: string;
}

// Interface for pagination
export interface PAGINATION {
  page: number;
  limit: number;
  numberOfResults: number;
  numberOfPages: number;
}

// Initial state for the units
export interface UNITS_STATE {
  units: UNIT[];
  currentUnit: UNIT | null;
  pagination?: PAGINATION;
  loadingUnit: boolean;
  errorUnit: string | null;
  createUnitSuccess: boolean;
  createUnitLoading: boolean;
  createUnitError: string | null;
  updateUnitLoading: boolean;
  updateUnitError: string | null;
  updateUnitSuccess: boolean;
  selectedUnit: UNIT | null;
  getUnitByIdLoading: boolean;
  getUnitByIdError: string | null;
}
