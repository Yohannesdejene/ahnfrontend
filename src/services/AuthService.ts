import HttpService, { HttpResetPasswordService } from "./HttpService";
import { SIGN_IN_DATA, SIGN_UP_DATA, CHANGE_PASSWORD_DATA } from "@/types/auth";
const BASE_URL = process.env.BASE_URL || "http://196.188.172.185:8045/api/v1/";
console.log("process.env.BASE_URL,", BASE_URL);

export async function apiSignIn(data: SIGN_IN_DATA): Promise<any> {
  const method = "POST";
  const url = `${BASE_URL}login`;
  return HttpService.request({ method, data, url });
}

export async function apiSignup(data: SIGN_UP_DATA): Promise<any> {
  const method = "POST";
  const url = `${BASE_URL}register`;
  return HttpService.request({ method, data, url });
}

export async function apiChangePasswordRequest(
  data: CHANGE_PASSWORD_DATA,
  token: string, // Add token as a parameter
): Promise<any> {
  const method = "POST";
  const url = `${BASE_URL}admin/password-reset`;
  // Add the token to the headers
  const headers = {
    Authorization: `Bearer ${token}`, // Authorization header with Bearer token
    "Content-Type": "application/json", // Ensure content type is set
  };

  return HttpService.request({ method, data, url, headers });
}

// export async function apiVerifyChangePasswordOTP(
//   data: VerifyChangePasswordOTPData,
// ): Promise<any> {
//   const method = "POST";
//   const url = `${BASE_URL}/admin/confirm-code`;
//   return HttpService.request({ method, data, url });
// }

// export async function apiResetPasswordFinal(
//   data: ResetPasswordFinalData & { resetPasswordToken: string },
// ): Promise<any> {
//   const method = "POST";
//   const url = `${BASE_URL}/admin/reset-password`;
//   HttpResetPasswordService.defaults.headers.common["Authorization"] =
//     `Bearer ${data.resetPasswordToken}`;
//   return HttpResetPasswordService.request({ method, data, url });
// }

// export async function apiUpdateFirstTimeLoginPassword(
//   data: UpdateFirstTimeLoginPasswordData & { resetPasswordToken: string },
// ): Promise<any> {
//   const method = "POST";
//   const url = `${API_URL}/admin/change-password`;
//   HttpResetPasswordService.defaults.headers.common["Authorization"] =
//     `Bearer ${resetPasswordToken}`;
//   return HttpResetPasswordService.request({ method, data, url });
// }

// export async function apiUpdateUserPassword(
//   data: UpdateFirstTimeLoginPasswordData,
// ): Promise<any> {
//   const method = "POST";
//   const url = `${API_URL}/admin/change-password`;
//   return HttpService.request({ method, data, url });
// }
