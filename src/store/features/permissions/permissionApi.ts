import HttpService from "@/services/HttpService";
import { ROLE, CREATE_ROLE, UPDATE_ROLE } from "./type"; // Import the ROLE types

// Fetch all roles
export async function apiGetAllPermission(): Promise<ROLE[]> {
  const method = "GET";
  const url = `/roleAndPermission/getAllPermissions`; //

  const response: any = await HttpService.request({
    method,
    url,
  });

  return response;
}

// Fetch a role by ID
export async function apiGetRoleById(id: number): Promise<ROLE> {
  const method = "GET";
  const url = `roleAndPermission/getRoleById/${id}`; // Endpoint for fetching a role by ID

  const response = await HttpService.request({
    method,
    url,
  });
  return response.data; // Assuming the response contains the role in `data`
}
