export interface BRANCH {
  id: number;
  name: string;
  location: string;
}
export interface SHIPMENT_MODE {
  id: number;
  code: string;
  description: string;
}
export interface SHIPMENT_TYPE {
  id: number;
  code: string;
  description: string;
}
export interface RATE {
  id: number;
  rate: number;
  sourceBranchId: number;
  destinationBranchId: number;
  shipmentModeId: number;
  shipmentTypeId: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  sourceBranch?: BRANCH; // Source branch details
  destinationBranch?: BRANCH; // Destination branch details
  ShipmentMode?: SHIPMENT_MODE;
  ShipmentType?: SHIPMENT_TYPE;
}

export interface CREATE_RATE {
  rate: number;
  sourceBranchId: number;
  destinationBranchId: number;
  shipmentModeId: number;
  shipmentTypeId: number;
}

export interface PAGINATION {
  page: number;
  limit: number;
  numberOfResults: number;
  numberOfPages: number;
}

// Initial state for the rates
export interface RATES_STATE {
  rates: RATE[];
  currentRate: RATE | null;
  pagination?: PAGINATION;
  loadingRate: boolean;
  errorRate: string | null;
  createRateSuccess: boolean;
  createRateLoading: boolean;
  createRateError: string | null;
  updateRateLoading: boolean;
  updateRateError: string | null;
  updateRateSuccess: boolean;
  selectedRate: RATE | null;
  getRateByIdLoading: boolean;
  getRateByIdError: string | null;
}
