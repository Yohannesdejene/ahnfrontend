import HttpService, { HttpResetPasswordService } from "./HttpService";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
interface CREATE_YEAR_DATA_TYPE {
  EUC_year: string;
  ETH_year: string;
  start_date: string;
  end_date: string | null;
}

interface CREATE_SCHOOL_DATA_TYPE {
  name: string;
  city: string;
  region: string;
  address: string;
  email: string;
  subcity: string;
  establish_date: string | null;
}

interface CREATE_COURSE_DATA_TYPE {
  name: string;
  code: string;
  department: string;
}
interface UPDATE_YEAR_DATA_TYPE {
  EUC_year?: string;
  ETH_year?: string;
  start_date?: string;
  end_date?: string | null;
  is_active?: true;
}
interface UPDATE_SCHOOL_DATA_TYPE {
  name?: string;
  city?: string;
  region?: string;
  address?: string;
  email?: string;
  subcity?: string;
  establish_date?: string | null;
}

interface UPDATE_COURSE_DATA_TYPE {
  code?: string;
  name?: string;
  department?: string;
}
export async function apiGetYearList(): Promise<any> {
  const method = "GET"; // Use GET method
  const url = `${BASE_URL}basic/year`; // Adjust the endpoint to match your API's URL

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
      throw new Error(response?.data?.message || "Error fetching countries ");
    }
  } catch (error: any) {
    console.log("error", error);
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
}
export async function apiGetYearById(id: number | null | string): Promise<any> {
  const method = "GET"; // Use GET method
  const url = `${BASE_URL}basic/year/${id}`; // Adjust the endpoint to match your API's URL

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
      throw new Error(response?.data?.message || "Error fetching countries ");
    }
  } catch (error: any) {
    console.log("error", error);
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
}
export async function apiCreateYear(data: CREATE_YEAR_DATA_TYPE): Promise<any> {
  const method = "POST";
  const url = `${BASE_URL}basic/year`;

  try {
    const response = await HttpService.request({ method, data, url });

    if (response.status === 200) {
      return response.data; // Return the data if the response is successful
    } else {
      throw new Error(
        response?.data?.message || "Error fetching payment methods",
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
export async function apiPutYear(
  id: number | null | string,
  data: UPDATE_YEAR_DATA_TYPE,
): Promise<any> {
  const method = "PUT";
  const url = `${BASE_URL}basic/year/${id}`;

  try {
    const response = await HttpService.request({ method, data, url });

    if (response.status === 200) {
      return response.data; // Return the data if the response is successful
    } else {
      throw new Error(
        response?.data?.message || "Error fetching payment methods",
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
export async function apiDeleteById(id: number | string | null): Promise<any> {
  const method = "DELETE"; // Use GET method
  const url = `${BASE_URL}basic/year/${id}`; // Adjust the endpoint to match your API's URL

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
      throw new Error(response?.data?.message || "Error fetching countries ");
    }
  } catch (error: any) {
    console.log("error", error);
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
}

////school

export async function apiGetSchoolList(): Promise<any> {
  const method = "GET"; // Use GET method
  const url = `${BASE_URL}basic/school`; // Adjust the endpoint to match your API's URL

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
      throw new Error(response?.data?.message || "Error fetching countries ");
    }
  } catch (error: any) {
    console.log("error", error);
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
}
export async function apiCreateSchool(
  data: CREATE_SCHOOL_DATA_TYPE,
): Promise<any> {
  const method = "POST";
  const url = `${BASE_URL}basic/school`;

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
export async function apiGetSchoolById(
  id: number | null | string,
): Promise<any> {
  const method = "GET"; // Use GET method
  const url = `${BASE_URL}basic/school/${id}`; // Adjust the endpoint to match your API's URL

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
export async function apiPutSchool(
  id: number | null | string,

  data: UPDATE_SCHOOL_DATA_TYPE,
): Promise<any> {
  const method = "PUT";
  const url = `${BASE_URL}basic/school/${id}`;

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

///course
export async function apiGetCourseList(): Promise<any> {
  const method = "GET"; // Use GET method
  const url = `${BASE_URL}basic/course`; // Adjust the endpoint to match your API's URL

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
export async function apiCreateCourse(
  data: CREATE_COURSE_DATA_TYPE,
): Promise<any> {
  const method = "POST";
  const url = `${BASE_URL}basic/course`;

  try {
    const response = await HttpService.request({ method, data, url });

    if (response.status === 200) {
      return response.data; // Return the data if the response is successful
    } else {
      throw new Error(response?.data?.message || "Error fetching courses ");
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
export async function apiGetCourseById(
  id: number | null | string,
): Promise<any> {
  const method = "GET"; // Use GET method
  const url = `${BASE_URL}basic/course/${id}`; // Adjust the endpoint to match your API's URL

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
export async function apiPutCourse(
  id: number | null | string,

  data: UPDATE_COURSE_DATA_TYPE,
): Promise<any> {
  const method = "PUT";
  const url = `${BASE_URL}basic/course/${id}`;

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
export async function apiDeleteCourseById(
  id: number | string | null,
): Promise<any> {
  const method = "DELETE"; // Use GET method
  const url = `${BASE_URL}basic/course/${id}`; // Adjust the endpoint to match your API's URL

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
      throw new Error(response?.data?.message || "Error fetching course ");
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