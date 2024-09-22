///course
import HttpService from "@/services/HttpService";
import { SEMESTER_CREATE } from "./type";
export async function apiGetSemesterList(
  size: number,
  currentPage: number,
): Promise<any> {
  const method = "GET"; // Use GET method
  let url = `/basic/semester`; // Adjust the endpoint to match your API's URL
  if (size && currentPage) url += `?size${size}&page${currentPage}`;

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
      throw new Error(response?.data?.message || "Error fetching cource ");
    }
  } catch (error: any) {
    console.log("error", error);
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
}

export async function apiCreateSemesterList(
  data: SEMESTER_CREATE,
): Promise<any> {
  const method = "POST";
  const url = `/basic/semester`;
  try {
    const response = await HttpService.request({ method, data, url });

    if (response.status === 200) {
      return response.data; // Return the data if the response is successful
    } else {
      throw new Error(response?.data?.message || "Error fetching semester ");
      // throw new Error("Error fetching payment methods");
    }
  } catch (error: any) {
    let errorMessage = "An error occurred.";

    if (
      error?.response?.data?.error && // Adjusted the path to match your error structure
      Array.isArray(error?.response?.data?.error)
    ) {
      // If the error contains an array, combine the messages with line breaks
      const errorMessagesArray = error?.response?.data?.error?.map(
        (err: any) => `${err.path}: ${err.message}`, // Format each error message
      );
      errorMessage = errorMessagesArray.join("\n"); // Join all error messages into a single string with line breaks
    } else if (typeof error?.message === "string") {
      // If the error has a single message string, use it
      errorMessage = error?.message;
    }

    throw new Error(errorMessage);
  }
}
export async function apiGetSemesterById(
  id: number | string | null,
): Promise<any> {
  const method = "GET"; // Use GET method
  const url = `/basic/semester/${id}`; // Adjust the endpoint to match your API's URL

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
export async function apiUpdateSemester(
  id: number | string | null,
  data: SEMESTER_CREATE,
): Promise<any> {
  const method = "PUT";
  const url = `/basic/semester/${id}`;

  try {
    const response = await HttpService.request({ method, data, url });

    if (response.status === 200) {
      return response.data; // Return the data if the response is successful
    } else {
      throw new Error(
        response?.data?.message || "Error fetching school methods",
      );
      // throw new Error("Error fetching payment methods");
    }
  } catch (error: any) {
    let errorMessage = "An error occurred.";

    if (
      error?.response?.data?.error && // Adjusted the path to match your error structure
      Array.isArray(error?.response?.data?.error)
    ) {
      // If the error contains an array, combine the messages with line breaks
      const errorMessagesArray = error?.response?.data?.error?.map(
        (err: any) => `${err.path}: ${err.message}`, // Format each error message
      );
      errorMessage = errorMessagesArray.join("\n"); // Join all error messages into a single string with line breaks
    } else if (typeof error?.message === "string") {
      // If the error has a single message string, use it
      errorMessage = error?.message;
    }

    throw new Error(errorMessage);
  }
}
export async function apiDeleteSemester(
  id: number | string | null,
): Promise<any> {
  const method = "DELETE"; // Use GET method
  const url = `/basic/semester/${id}`; // Adjust the endpoint to match your API's URL
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
      throw new Error(response?.data?.message || "Error fetching semester ");
    }
  } catch (error: any) {
    let errorMessage = "An error occurred.";

    if (
      error?.response?.data?.error && // Adjusted the path to match your error structure
      Array.isArray(error?.response?.data?.error)
    ) {
      // If the error contains an array, combine the messages with line breaks
      const errorMessagesArray = error?.response?.data?.error?.map(
        (err: any) => `${err.path}: ${err.message}`, // Format each error message
      );
      errorMessage = errorMessagesArray.join("\n"); // Join all error messages into a single string with line breaks
    } else if (typeof error?.message === "string") {
      // If the error has a single message string, use it
      errorMessage = error?.message;
    }

    throw new Error(errorMessage);
  }
}
