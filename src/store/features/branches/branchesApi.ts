import HttpService from "@/services/HttpService";
import { CREATE_BRANCH } from "./type"; // Import the CREATE_BRANCH type

// Fetch all branches
export async function apiGetBranchList(): Promise<any> {
  const method = "GET";
  const url = `branch/getBranches`; // Endpoint for fetching branches

  const response = await HttpService.request({
    method,
    url,
  });
  return response;
}

// Create a new branch
export async function apiCreateBranch(data: CREATE_BRANCH): Promise<any> {
  const method = "POST";
  const url = `branch/addBranch`; // Endpoint for adding a branch

  const response = await HttpService.request({ method, data, url });
  return response;
}

// Update an existing branch
export async function apiUpdateBranch(
  id: number | string | null,
  data: any,
): Promise<any> {
  const method = "PUT";
  const url = `branch/updateBranch/${id}`; // Endpoint for updating a branch

  const response = await HttpService.request({ method, data, url });
  return response;
}

// Get a branch by ID
export async function apiGetBranchById(
  id: number | string | null,
): Promise<any> {
  const method = "GET";
  const url = `branch/getBranchById/${id}`; // Endpoint for fetching a branch by ID

  const response = await HttpService.request({
    method,
    url,
  });
  return response;
}

// Delete a branch
export async function apiDeleteBranch(
  id: number | string | null,
): Promise<any> {
  const method = "DELETE";
  const url = `branch/deleteBranch/${id}`; // Endpoint for deleting a branch

  const response = await HttpService.request({ method, url });
  return response;
}
