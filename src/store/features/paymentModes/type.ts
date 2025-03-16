export interface PAYMENT_MODES {
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

// Initial state for the payment modes
export interface PAYMENT_MODES_STATE {
  paymentModes: PAYMENT_MODES[];
  pagination?: PAGINATION;
  loadingPaymentMode: boolean;
  errorPaymentMode: string | null;
  createPaymentModeSuccess: boolean;
  createPaymentModeLoading: boolean;
  createPaymentModeError: string | null;
  updatePaymentModeLoading: boolean;
  updatePaymentModeError: string | null;
  updatePaymentModeSuccess: boolean;
  selectedPaymentMode: PAYMENT_MODES | null;
  getPaymentModeByIdLoading: boolean;
  getPaymentModeByIdError: string | null;
}

export interface CREATE_PAYMENT_MODE {
  code: string;
  description: string;
}
