import HttpService from "@/services/HttpService";
import { ADD_COMPANY, UPDATE_COMPANY } from "./type"; // Import the CREATE_COMPANY type

// Fetch all companies
export async function apiGetCompanyList(): Promise<any> {
  const method = "GET";
  const url = `adminManageUsers/getAllActiveCompanies`; // Endpoint for fetching companies

  const response = await HttpService.request({
    method,
    url,
  });
  return response;
}
export async function apiGetAllCompanyList(): Promise<any> {
  const method = "GET";
  const url = `adminManageUsers/getAllCompanies`; // Endpoint for fetching companies
  const response = await HttpService.request({
    method,
    url,
  });
  return response;
}
// Create a new company
export async function apiCreateCompany(data: ADD_COMPANY): Promise<any> {
  const method = "POST";
  const url = `adminManageUsers/addCompany`; // Endpoint for adding a company

  const response = await HttpService.request({ method, data, url });
  return response;
}
// Update an existing company
export async function apiUpdateCompany(
  id: number | string | null,
  data: UPDATE_COMPANY,
): Promise<any> {
  const method = "PUT";
  const url = `adminManageUsers/updateCompany/${id}`; // Endpoint for updating a company
  const response = await HttpService.request({ method, data, url });
  return response;
}
// Get a company by ID
export async function apiGetCompanyById(
  id: number | string | null,
): Promise<any> {
  const method = "GET";
  const url = `adminManageUsers/getCompanyById/${id}`; // Endpoint for fetching a company by ID

  const response = await HttpService.request({
    method,
    url,
  });
  return response;
}
// Delete a company
export async function apiDeleteCompany(
  id: number | string | null,
): Promise<any> {
  const method = "DELETE";
  const url = `adminManageUsers/deleteCompany/${id}`; // Endpoint for deleting a company

  const response = await HttpService.request({ method, url });
  return response;
}
// Change company status API
export async function apiChangeCompanyStatusCompany(
  id: number | string,
  data: { status: string },
): Promise<any> {
  const method = "PUT";
  const url = `adminManageUsers/changeCompanyStatus/${id}`; // Endpoint for changing company status

  const response = await HttpService.request({
    method,
    url,
    data,
  });
  return response;
}
export async function apiChangeCompanyEmailOrPhoneCompany(
  id: number | string | null,
): Promise<any> {
  const method = "PUT";
  const url = `changeEmailOrPhone/changeEmailOrPhone/${id}`; // Endpoint for deleting a company
  const response = await HttpService.request({ method, url });
  return response;
}
