import HttpService from "@/services/HttpService";
import { CREATE_PAYMENT_MODE } from "./type"; // Update the type import

export async function apiGetPaymentModeList(): Promise<any> {
  const method = "GET";
  const url = `shipments/status/getPaymentMode`; // Update the endpoint

  const response = await HttpService.request({
    method,
    url,
  });
  return response;
}

export async function apiCreatePaymentMode(
  data: CREATE_PAYMENT_MODE,
): Promise<any> {
  const method = "POST";
  const url = `shipments/status/addPaymentMode`; // Update the endpoint
  console.log("data", data);

  const response = await HttpService.request({ method, data, url });
  return response;
}

export async function apiUpdatePaymentMode(
  id: number | string | null,
  data: any,
): Promise<any> {
  const method = "PUT";
  const url = `shipments/status/updatePaymentMode/${id}`; // Update the endpoint

  const response = await HttpService.request({ method, data, url });
  return response;
}

export async function apiGetPaymentModeById(
  id: number | string | null,
): Promise<any> {
  const method = "GET"; // Use GET method
  const url = `shipments/status/getPaymentMode/${id}`; // Update the endpoint

  try {
    const response = await HttpService.request({
      method,
      url,
    });

    // Assuming the response returns JSON data, you can handle it here
    if (response.status === 200) {
      return response.data; // Return the data if the response is successful
    } else {
      throw new Error(response?.data?.message || "Error fetching payment mode");
    }
  } catch (error: any) {
    console.log("error", error);
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
}

// Add delete payment mode function
export async function apiDeletePaymentMode(
  id: number | string | null,
): Promise<any> {
  const method = "DELETE";
  const url = `shipments/status/deletePaymentMode/${id}`; // Update the endpoint

  const response = await HttpService.request({ method, url });
  return response;
}
