import HttpService from "@/services/HttpService";
import { STUDENT_CREATE } from "./type";

// Fetch all students with pagination and filters
export async function apiGetStudentsList(
  size: number,
  currentPage: number,
  filters?: Record<string, any>, // Filters as key-value pairs
): Promise<any> {
  const method = "GET"; // Use GET method
  let url = `/who/student`; // Adjust the endpoint to match your API's URL
  if (size && currentPage) url += `?limit=${size}&page=${currentPage}`;

  // Append filters to the URL only if they have valid values
  if (filters) {
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value !== null && value !== undefined && value !== "") {
        url += `&${key}=${encodeURIComponent(value)}`;
      }
    });
  }

  try {
    const response = await HttpService.request({
      method,
      url,
    });

    // Assuming the response returns JSON data, you can handle it here
    if (response.status === 200) {
      return response.data; // Return the data if the response is successful
    } else {
      throw new Error(response?.data?.message || "Error fetching students");
    }
  } catch (error: any) {
    console.error("Error fetching students:", error);
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
}

// Create a new student
export async function apiCreateStudentsList(data: STUDENT_CREATE): Promise<any> {
  const method = "POST";
  const url = `/who/student`;
  try {
    const response = await HttpService.request({ method, data, url });

    if (response.status === 200) {
      return response.data; // Return the data if the response is successful
    } else {
      throw new Error(response?.data?.message || "Error creating student");
    }
  } catch (error: any) {
    console.error("Error creating student:", error);
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
}

// Get a student by ID
export async function apiGetStudentsById(id: number | string | null): Promise<any> {
  const method = "GET"; // Use GET method
  const url = `/who/student/${id}`; // Adjust the endpoint to match your API's URL

  try {
    const response = await HttpService.request({
      method,
      url,
    });

    if (response.status === 200) {
      return response.data; // Return the data if the response is successful
    } else {
      throw new Error(response?.data?.message || "Error fetching student by ID");
    }
  } catch (error: any) {
    console.error("Error fetching student by ID:", error);
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
}

// Update a student
export async function apiUpdateStudents(
  id: number | string | null,
  data: STUDENT_CREATE,
): Promise<any> {
  const method = "PUT";
  const url = `/who/student/${id}`;

  try {
    const response = await HttpService.request({ method, data, url });

    if (response.status === 200) {
      return response.data; // Return the data if the response is successful
    } else {
      throw new Error(response?.data?.message || "Error updating student");
    }
  } catch (error: any) {
    console.error("Error updating student:", error);
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
}