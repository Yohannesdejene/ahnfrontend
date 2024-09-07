export interface SIGN_IN_DATA {
  email: string;
  password: string;
}

export interface SIGN_UP_DATA {
  username: string;
  password: string;
  email: string;
  opt: string;
}

export interface CHANGE_PASSWORD_DATA {
  oldPassword: string;
  newPassword: string;
}

export interface API_OPTIONS {
  url: string;
  data?: any;
}
// export interface VerifyChangePasswordOTPData {
//   otp: string;
// }

// export interface ResetPasswordFinalData {
//   newPassword: string;
//   confirmPassword: string;
// }

// export interface UpdateFirstTimeLoginPasswordData {
//   newPassword: string;
//   confirmPassword: string;
// }
