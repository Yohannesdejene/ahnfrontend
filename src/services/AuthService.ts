import HttpService, { HttpResetPasswordService } from "./HttpService";
import { SIGN_IN_DATA, SIGN_UP_DATA, CHANGE_PASSWORD_DATA } from "@/types/auth";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// export async function apiSignIn(data: SIGN_IN_DATA): Promise<any> {
//   const method = "POST";
//   const url = `${BASE_URL}auth/login`;
//   return HttpService.request({ method, data, url });
// }
export async function apiSignIn(data: SIGN_IN_DATA): Promise<any> {
  const method = "POST";
  const url = `${BASE_URL}auth/login`;

  try {
    const response = await HttpService.request({ method, data, url });
    console.log("response-response", response);
    if (response.status === 200) {
      return response.data; // Return the data if the response is successful
    } else {
      console.log("else part ");
      throw new Error(
        response?.data?.message || "Error fetching payment methods",
      );
    }
  } catch (error: any) {
    console.log("error catch ", error);
    // throw new Error(error?.response?.data?.errors || "An error occurred");

    // Default error message
    let errorMessage = "Email or password invalid, please try again.";

    if (
      error?.response?.data?.errors &&
      Array.isArray(error.response.data.errors)
    ) {
      // If the error contains an array, combine the messages
      const errorMessagesArray = error.response.data.errors;
      errorMessage = errorMessagesArray.join(", "); // Join all error messages into a single string
    } else if (typeof error?.message === "string") {
      // If the error has a single message string, use it
      errorMessage = error.message;
    }
    throw new Error(errorMessage);

    // Set the error message to be displayed in the UI
    // setErrorMessage(errorMessage);
  }
}

export async function apiSignup(data: SIGN_UP_DATA): Promise<any> {
  const method = "POST";
  const url = `${BASE_URL}auth/register`;
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
