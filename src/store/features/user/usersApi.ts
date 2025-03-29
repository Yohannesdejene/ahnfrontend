import HttpService from "@/services/HttpService";
import { USER, CREATE_USER,UPDATE_USER } from "./type"; // Import the USER type

// Fetch all branches
export async function apiGetUserList(): Promise<any> {
  const method = "GET";
  const url = `user/getFilteredUsers`; // Endpoint for fetching branches

  const response = await HttpService.request({
    method,
    url,
  });
  return response;
}

// Create a new branch
export async function apiCreateUser(data: CREATE_USER): Promise<any> {
  const method = "POST";
  const url = `user/addUser`; // Endpoint for adding a branch

  const response = await HttpService.request({ method, data, url });
  return response;
}

// Update an existing branch
export async function apiUpdateUser(
  id: number | string | null,
  data: any,
): Promise<any> {
  const method = "PUT";
  const url = `user/updateUser/${id}`; // Endpoint for updating a branch

  const response = await HttpService.request({ method, data, url });
  return response;
}

// Get a branch by ID
export async function apiGetUserById(id: number | string | null): Promise<any> {
  const method = "GET";
  const url = `user/getUserById/${id}`; // Endpoint for fetching a branch by ID

  const response = await HttpService.request({
    method,
    url,
  });
  return response;
}

// Delete a branch
export async function apiDeleteUser(id: number | string | null): Promise<any> {
  const method = "DELETE";
  const url = `user/deleteUser/${id}`; // Endpoint for deleting a branch

  const response = await HttpService.request({ method, url });
  return response;
}
