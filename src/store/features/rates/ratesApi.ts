import HttpService from "@/services/HttpService";
import { CREATE_RATE } from "./type"; // Import the CREATE_RATE type

// Fetch all rates
export async function apiGetRateList(): Promise<any> {
  const method = "GET";
  const url = `shipments/rate/getRates`; // Endpoint for fetching rates

  const response = await HttpService.request({
    method,
    url,
  });
  return response;
}

// Create a new rate
export async function apiCreateRate(data: CREATE_RATE): Promise<any> {
  const method = "POST";
  const url = `shipments/rate/addRate`; // Endpoint for adding a rate

  const response = await HttpService.request({ method, data, url });
  return response;
}

// Update an existing rate
export async function apiUpdateRate(
  id: number | string | null,
  data: any,
): Promise<any> {
  const method = "PUT";
  const url = `shipments/rate/updateRate/${id}`; // Endpoint for updating a rate

  const response = await HttpService.request({ method, data, url });
  return response;
}

// Get a rate by ID
export async function apiGetRateById(id: number | string | null): Promise<any> {
  const method = "GET";
  const url = `shipments/rate/getRateById/${id}`; // Endpoint for fetching a rate by ID

  const response = await HttpService.request({
    method,
    url,
  });
  return response;
}

// Delete a rate
export async function apiDeleteRate(id: number | string | null): Promise<any> {
  const method = "DELETE";
  const url = `shipments/rate/deleteRate/${id}`; // Endpoint for deleting a rate

  const response = await HttpService.request({ method, url });
  return response;
}
// Search for a rate based on parameters
export async function apiSearchRate(params: {
  sourceBranchId: number;
  destinationBranchId: number;
  shipmentTypeId: number;
  shipmentModeId: number;
}): Promise<any> {
  const method = "GET";
  const { sourceBranchId, destinationBranchId, shipmentTypeId, shipmentModeId } = params;
  const url = `shipments/rate/getRates?sourceBranchId=${sourceBranchId}&destinationBranchId=${destinationBranchId}&shipmentTypeId=${shipmentTypeId}&shipmentModeId=${shipmentModeId}`; // Endpoint for searching rates

  const response = await HttpService.request({
    method,
    url,
  });
  return response;
}