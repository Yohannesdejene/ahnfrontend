export interface SHIPMENT_TYPES {
  id: number;
  code: string;
  description: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface PAGINATION {
  page: number;
  limit: number;
  numberOfResults: number;
  numberOfPages: number;
}

// Initial state for the shipment types
export interface SHIPMENT_TYPES_STATE {
  shipmentTypes: SHIPMENT_TYPES[];
  currentShipmentType: SHIPMENT_TYPES | null;
  pagination?: PAGINATION;
  loadingShipmentType: boolean;
  errorShipmentType: string | null;
  createShipmentTypeSuccess: boolean;
  createShipmentTypeLoading: boolean;
  createShipmentTypeError: string | null;
  updateShipmentTypeLoading: boolean;
  updateShipmentTypeError: string | null;
  updateShipmentTypeSuccess: boolean;
  selectedShipmentType: SHIPMENT_TYPES | null;
  getShipmentTypeByIdLoading: boolean;
  getShipmentTypeByIdError: string | null;
}

export interface CREATE_SHIPMENT_TYPE {
  code: string;
  description: string;
}
