///course
import HttpService from "@/services/HttpService";
import { SECTION_CREATE } from "./type";
export async function apiGetSectionList(
  size: number,
  currentPage: number,
  search?: string,
): Promise<any> {
  const method = "GET"; // Use GET method
  let url = `/education/section`; // Adjust the endpoint to match your API's URL
  if (size && currentPage) url += `?limit=${size}&page=${currentPage}`;
  if (search) url += `&search=${search}`;

  try {
    const response = await HttpService.request({
      method,
      url,
    });

    // Assuming the response returns JSON data, you can handle it here
    if (response.status === 200) {
      return response.data; // Return the data if the response is successful
    } else {
      // throw new Error(response?.message || "Error fetching payment methods");
      throw new Error(response?.data?.message || "Error fetching sections ");
    }
  } catch (error: any) {
    console.log("error", error);
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
}

export async function apiCreateSectionList(data: SECTION_CREATE): Promise<any> {
  const method = "POST";
  const url = `/education/section`;
  try {
    const response = await HttpService.request({ method, data, url });

    if (response.status === 200) {
      return response.data; // Return the data if the response is successful
    } else {
      throw new Error(response?.data?.message || "Error fetching section ");
      // throw new Error("Error fetching payment methods");
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
}
export async function apiGetSectionById(
  id: number | string | null,
): Promise<any> {
  const method = "GET"; // Use GET method
  const url = `/education/section/${id}`; // Adjust the endpoint to match your API's URL

  try {
    const response = await HttpService.request({
      method,
      url,
    });

    // Assuming the response returns JSON data, you can handle it here
    if (response.status === 200) {
      return response.data; // Return the data if the response is successful
    } else {
      // throw new Error(response?.message || "Error fetching payment methods");
      throw new Error(response?.data?.message || "Error fetching year ");
    }
  } catch (error: any) {
    console.log("error", error);
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
}
export async function apiUpdateSection(
  id: number | string | null,
  data: SECTION_CREATE,
): Promise<any> {
  const method = "PUT";
  const url = `/education/section/${id}`;

  try {
    const response = await HttpService.request({ method, data, url });

    if (response.status === 200) {
      return response.data; // Return the data if the response is successful
    } else {
      throw new Error(response?.data?.message || "Error fetching section ");
      // throw new Error("Error fetching payment methods");
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
}
