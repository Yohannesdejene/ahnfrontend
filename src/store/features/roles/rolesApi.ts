import HttpService from "@/services/HttpService";
import { ROLE, CREATE_ROLE, UPDATE_ROLE } from "./type"; // Import the ROLE types

// Fetch all roles
export async function apiGetAllRoles(): Promise<ROLE[]> {
  const method = "GET";
  const url = `roleAndPermission/getAllRoles`; // Endpoint for fetching all roles

  const response = await HttpService.request({
    method,
    url,
  });
  return response.data; // Assuming the response contains the roles in `data`
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

// Create a new role
export async function apiCreateRole(data: CREATE_ROLE): Promise<any> {
  const method = "POST";
  const url = `roleAndPermission/addRole`; // Endpoint for creating a role

  const response = await HttpService.request({
    method,
    url,
    data,
  });
  return response;
}

// Update an existing role
export async function apiUpdateRole(
  id: number,
  data: UPDATE_ROLE,
): Promise<any> {
  const method = "PUT";
  const url = `roleAndPermission/updateRole/${id}`; // Endpoint for updating a role

  const response = await HttpService.request({
    method,
    url,
    data,
  });
  return response;
}

// Delete a role by ID
export async function apiDeleteRole(id: number): Promise<any> {
  const method = "DELETE";
  const url = `roleAndPermission/deleteRoleById/${id}`; // Endpoint for deleting a role

  const response = await HttpService.request({
    method,
    url,
  });
  return response;
}
