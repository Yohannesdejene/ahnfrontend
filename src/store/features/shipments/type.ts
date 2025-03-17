// Interface for creating or updating a shipment
export interface SHIPMENT_CREATE_UPDATE {
  manualAwb?: string;
  shipmentTypeId: number;
  shipmentModeId?: number;
  paymentModeId: number;
  paymentMethodId: number;
  deliveryModeId: number;
  companyId?: number;
  senderBranchId?: number;
  senderName: string;
  senderPhone: string;
  recipientBranchId: number;
  recipientName: string;
  recipientPhone: string;
  shipmentDescription: string;
  rate?: number;
  rateId?: number;
  netFee: number;
  quantity: number;
  unitId: number;
  noOfPcs: number;
  addedBy?: string; // Optional field
}

// Interface for a single shipment
export interface SHIPMENT {
  id: number;
  awb: string;
  manualAwb: string;
  shipmentTypeId: number;
  shipmentModeId: number;
  paymentModeId: number;
  paymentMethodId: number;
  deliveryModeId: number;
  companyId: number;
  senderBranchId: number;
  senderName: string;
  senderPhone: string;
  recipientBranchId: number;
  recipientName: string;
  recipientPhone: string;
  shipmentDescription: string;
  rate: number;
  rateId: number;
  netFee: number;
  quantity: number;
  unitId: number;
  noOfPcs: number;
  statusId: number;
  sourceBranchId: number;
  destinationBranchId: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Interface for fetching shipments with filters
export interface SHIPMENT_FILTERS {
  statusId?: number;
  sourceBranchId?: number;
  destinationBranchId?: number;
  shipmentModeId?: number;
  paymentModeId?: number;
  paymentMethodId?: number;
  companyId?: number;
  awb?: string;
  senderPhone?: string;
  startDate?: string; // ISO date string
  endDate?: string; // ISO date string
  page?: number;
  pageSize?: number;
}

// Interface for pagination
export interface PAGINATION {
  page: number;
  pageSize: number;
  numberOfResults: number;
  numberOfPages: number;
}

// Interface for the shipment state
export interface SHIPMENT_STATE {
  shipments: SHIPMENT[];
  pagination: PAGINATION;
  loadingShipments: boolean;
  errorShipments: string | null;
  createShipmentSuccess: boolean;
  createShipmentLoading: boolean;
  createShipmentError: string | null;
  updateShipmentLoading: boolean;
  updateShipmentError: string | null;
  updateShipmentSuccess: boolean;
  selectedShipment: SHIPMENT | null;
  getShipmentByIdLoading: boolean;
  getShipmentByIdError: string | null;
  deleteShipmentLoading: boolean;
  deleteShipmentError: string | null;
  deleteShipmentSuccess: boolean;
}
