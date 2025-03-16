import HttpService from "@/services/HttpService";
import { CREATE_SHIPMENT_MODE } from "./type"; // Update the type import

export async function apiGetShipmentModeList(): Promise<any> {
  const method = "GET";
  const url = `shipments/status/getShipmentMode`; // Update the endpoint

  const response = await HttpService.request({
    method,
    url,
  });
  return response;
}
export async function apiCreateShipmentMode(
  data: CREATE_SHIPMENT_MODE,
): Promise<any> {
  const method = "POST";
  const url = `shipments/status/addShipmenMode`; // Update the endpoint
  console.log("data", data);

  const response = await HttpService.request({ method, data, url });
  return response;
}
export async function apiUpdateShipmentMode(
  id: number | string | null,
  data: any,
): Promise<any> {
  const method = "PUT";
  const url = `shipments/status/updatePaymentMode/${id}`; // Update the endpoint

  const response = await HttpService.request({ method, data, url });
  return response;
}
export async function apiGetShipmentModeById(
  id: number | string | null,
): Promise<any> {
  const method = "GET"; // Use GET method
  const url = `shipments/status/getShipmentModeById/${id}`; // Update the endpoint

  try {
    const response = await HttpService.request({
      method,
      url,
    });

    // Assuming the response returns JSON data, you can handle it here
    if (response.status === 200) {
      return response.data; // Return the data if the response is successful
    } else {
      throw new Error(
        response?.data?.message || "Error fetching shipment mode",
      );
    }
  } catch (error: any) {
    console.log("error", error);
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
}
export async function apiDeleteShipmentMode(
  id: number | string | null,
): Promise<any> {
  const method = "DELETE";
  const url = `shipments/status/deleteShipmentMode/${id}`; // Update the endpoint

  try {
    const response = await HttpService.request({ method, url });

    if (response.status === 200) {
      return response.data; // Return the data if the response is successful
    } else {
      throw new Error(
        response?.data?.message || "Error deleting shipment mode",
      );
    }
  } catch (error: any) {
    console.log("error", error);
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
}
