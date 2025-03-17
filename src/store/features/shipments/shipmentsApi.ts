import HttpService from "@/services/HttpService";
import { SHIPMENT_CREATE_UPDATE } from "./type";

// Fetch all shipments with pagination and filters
export async function apiGetShipmentsList(
  page: number = 1,
  pageSize: number = 10,
  filters?: any,
): Promise<any> {
  const method = "GET";
  let url = `/shipments/crud/getShipments?page=${page}&limit=${pageSize}`;

  // Append filters to the URL
  if (filters) {
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        url += `&${key}=${filters[key]}`;
      }
    });
  }

  const response = await HttpService.request({ method, url });
  return response;
}

// Create a new shipment
export async function apiCreateShipment(
  data: SHIPMENT_CREATE_UPDATE,
): Promise<any> {
  const method = "POST";
  const url = `/shipments/crud/createShipment`;

  const response = await HttpService.request({ method, data, url });
  return response;
}

// Get a shipment by ID
export async function apiGetShipmentById(id: number | string): Promise<any> {
  const method = "GET";
  const url = `/shipments/crud/getShipmentById/${id}`;

  const response = await HttpService.request({ method, url });
  return response;
}

// Update an existing shipment
export async function apiUpdateShipment(
  id: number | string,
  data: SHIPMENT_CREATE_UPDATE,
): Promise<any> {
  const method = "PUT";
  const url = `/shipments/crud/updateShipment/${id}`;

  const response = await HttpService.request({ method, data, url });
  return response;
}

// Get shipments by ID or AWB
export async function apiGetShipmentsByIdOrAwb(
  id?: number | string,
  awb?: string,
): Promise<any> {
  const method = "GET";
  let url = `/shipments/crud/getShipmentsByIdOrAwb`;

  if (id) url += `?id=${id}`;
  if (awb) url += `${id ? "&" : "?"}awb=${awb}`;

  const response = await HttpService.request({ method, url });
  return response;
}
