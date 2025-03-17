import HttpService from "@/services/HttpService";
import { CREATE_UNIT } from "./type"; // Import the CREATE_UNIT type

// Fetch all units
export async function apiGetUnitList(): Promise<any> {
  const method = "GET";
  const url = `shipments/status/getUnits`; // Endpoint for fetching units

  const response = await HttpService.request({
    method,
    url,
  });
  return response;
}

// Create a new unit
export async function apiCreateUnit(data: CREATE_UNIT): Promise<any> {
  const method = "POST";
  const url = `shipments/status/addUnit`; // Endpoint for adding a unit

  const response = await HttpService.request({ method, data, url });
  return response;
}

// Get a unit by ID
export async function apiGetUnitById(id: number | string | null): Promise<any> {
  const method = "GET";
  const url = `shipments/status/getUnitById/${id}`; // Endpoint for fetching a unit by ID

  const response = await HttpService.request({ method, url });
  return response;
}

// Update an existing unit
export async function apiUpdateUnit(
  id: number | string | null,
  data: any,
): Promise<any> {
  const method = "PUT";
  const url = `shipments/status/updateUnit/${id}`; // Endpoint for updating a unit

  const response = await HttpService.request({ method, data, url });
  return response;
}

// Delete a unit
export async function apiDeleteUnit(id: number | string | null): Promise<any> {
  const method = "DELETE";
  const url = `shipments/status/deleteUnit/${id}`; // Endpoint for deleting a unit

  const response = await HttpService.request({ method, url });
  return response;
}
