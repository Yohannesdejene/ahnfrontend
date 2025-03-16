import HttpService from "@/services/HttpService";
import { CREATE_PAYMENT_METHOD } from "./type"; // Update the type import

export async function apiGetPaymentMethodList(): Promise<any> {
  const method = "GET";
  const url = `shipments/status/getPaymentMethod`; // Update the endpoint

  const response = await HttpService.request({
    method,
    url,
  });
  return response;
}

export async function apiCreatePaymentMethod(
  data: CREATE_PAYMENT_METHOD,
): Promise<any> {
  const method = "POST";
  const url = `shipments/status/addPaymentMethod`; // Update the endpoint
  console.log("data", data);

  const response = await HttpService.request({ method, data, url });
  return response;
}

export async function apiUpdatePaymentMethod(
  id: number | string | null,
  data: any,
): Promise<any> {
  const method = "PUT";
  const url = `shipments/status//updatePaymentMethod/${id}`; // Update the endpoint

  const response = await HttpService.request({ method, data, url });
  return response;
}

export async function apiGetPaymentMethodById(
  id: number | string | null,
): Promise<any> {
  const method = "GET"; // Use GET method
  const url = `shipments/status/getPaymentMethodById/${id}`; // Update the endpoint

  const response = await HttpService.request({
    method,
    url,
  });
  return response;
}
// Add delete payment method function
export async function apiDeletePaymentMethod(
  id: number | string | null,
): Promise<any> {
  const method = "DELETE";
  const url = `shipments/status/deletePaymentMethod/${id}`; // Update the endpoint

  const response = await HttpService.request({ method, url });
  return response;
}
