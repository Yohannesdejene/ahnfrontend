export interface SHIPMENT_MODES {
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

// Initial state for the shipment modes
export interface SHIPMENT_MODES_STATE {
  shipmentModes: SHIPMENT_MODES[];
  currentShipmentMode: SHIPMENT_MODES | null;
  pagination?: PAGINATION;
  loadingShipmentMode: boolean;
  errorShipmentMode: string | null;
  createShipmentModeSuccess: boolean;
  createShipmentModeLoading: boolean;
  createShipmentModeError: string | null;
  updateShipmentModeLoading: boolean;
  updateShipmentModeError: string | null;
  updateShipmentModeSuccess: boolean;
  selectedShipmentMode: SHIPMENT_MODES | null;
  getShipmentModeByIdLoading: boolean;
  getShipmentModeByIdError: string | null;
}

export interface CREATE_SHIPMENT_MODE {
  code: string;
  description: string;
}
