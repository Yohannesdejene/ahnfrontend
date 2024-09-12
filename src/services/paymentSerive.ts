import HttpService, { HttpResetPasswordService } from "./HttpService";
import { SIGN_IN_DATA, SIGN_UP_DATA, CHANGE_PASSWORD_DATA } from "@/types/auth";
const BASE_URL = process.env.BASE_URL || "http://196.188.172.185:8045/api/v1/";
console.log("process.env.BASE_URL,", BASE_URL);

// Function to make the GET request to fetch payment methods
export async function apiGetPaymentMethods(): Promise<any> {
  const method = "GET"; // Use GET method
  const url = `${BASE_URL}payment-methods`; // Adjust the endpoint to match your API's URL

  try {
    const response = await HttpService.request({
      method,
      url,
    });

    // Assuming the response returns JSON data, you can handle it here
    if (response.status === 200) {
      return response.data; // Return the data if the response is successful
    } else {
      throw new Error(response?.message || "Error fetching payment methods");
    }
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
}

export async function apiCreatePaymentMethods(
  data: SIGN_UP_DATA,
): Promise<any> {
  const method = "POST";
  const url = `${BASE_URL}register`;
  return HttpService.request({ method, data, url });
}
