export type USER = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  otp: string;
  otpExpiration: string; // ISO date string
  firstTime: number; // 0 or 1
  roleId: number;
  branchId: number;
  status: "ACTIVE" | "INACTIVE"; // Enum-like string
  addedBy: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  Branch: any;
  Role: any;
};

export interface CREATE_USER {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roleId: number;
  branchId: number;
}
export interface UPDATE_USER {
  firstName: string;
  lastName: string;
  roleId: number;
  branchId: number;
}
