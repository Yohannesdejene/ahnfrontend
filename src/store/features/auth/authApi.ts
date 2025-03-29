import HttpService from "@/services/HttpService";

// Fetch all companies
export async function apiGetProfile(): Promise<any> {
  const method = "GET";
  const url = `user/getProfile`; // Endpoint for fetching companies
  const response = await HttpService.request({
    method,
    url,
  });
  return response;
}
