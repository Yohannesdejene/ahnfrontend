export interface PAYMENT_METHODS {
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

// Initial state for the payment methods
export interface PAYMENT_METHODS_STATE {
  paymentMethods: PAYMENT_METHODS[];
  currentPaymentMethod: PAYMENT_METHODS | null;
  pagination?: PAGINATION;
  loadingPaymentMethod: boolean;
  errorPaymentMethod: string | null;
  createPaymentMethodSuccess: boolean;
  createPaymentMethodLoading: boolean;
  createPaymentMethodError: string | null;
  updatePaymentMethodLoading: boolean;
  updatePaymentMethodError: string | null;
  updatePaymentMethodSuccess: boolean;
  selectedPaymentMethod: PAYMENT_METHODS | null;
  getPaymentMethodByIdLoading: boolean;
  getPaymentMethodByIdError: string | null;
}

export interface CREATE_PAYMENT_METHOD {
  code: string;
  description: string;
}
