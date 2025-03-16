import HttpService from "@/services/HttpService";
import { CREATE_SHIPMENT_TYPE } from "./type"; // Update the type import

export async function apiGetShipmentTypeList(): Promise<any> {
  const method = "GET";
  const url = `shipments/status/getShipmentTypes`; // Update the endpoint

  const response = await HttpService.request({
    method,
    url,
  });
  return response;
}
export async function apiCreateShipmentType(
  data: CREATE_SHIPMENT_TYPE,
): Promise<any> {
  const method = "POST";
  const url = `shipments/status/addShipmentType`; // Update the endpoint
  const response = await HttpService.request({ method, data, url });
  return response;
}
export async function apiGetShipmentTypeById(
  id: number | string | null,
): Promise<any> {
  const method = "GET";
  const url = `shipments/status/getShipmentTypeById/${id}`; // Update the endpoint
  const response = await HttpService.request({ method, url });
  return response;
}
export async function apiUpdateShipmentType(
  id: number | string | null,
  data: any,
): Promise<any> {
  const method = "PUT";
  const url = `shipments/status/updateShipmentType/${id}`; // Update the endpoint

  const response = await HttpService.request({ method, data, url });
  return response;
}

export async function apiDeleteShipmentType(
  id: number | string | null,
): Promise<any> {
  const method = "DELETE";
  const url = `shipments/status/deleteShipmentType/${id}`; // Update the endpoint
  const response = await HttpService.request({ method, url });
  return response;
}
