import HttpService from "./HttpService";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface CREATE_CURRENCY_DATA_TYPE {
  code: string;
  description: string;
  countryId: number;
  addedBy: number | null;
}
export async function apiGetCurrencyList(): Promise<any> {
  const method = "GET"; // Use GET method
  const url = `${BASE_URL}currencies`; // Adjust the endpoint to match your API's URL

  try {
    const response = await HttpService.request({
      method,
      url,
    });

    if (response.status === 200) {
      return response.data; // Return the data if the response is successful
    } else {
      // throw new Error(response?.message || "Error fetching payment methods");
      throw new Error("Error fetching payment methods");
    }
  } catch (error: any) {
    console.log("error", error);
    throw new Error(error.message || "An error occurred");
  }
}
export async function apiCreateCurrency(
  data: CREATE_CURRENCY_DATA_TYPE,
): Promise<any> {
  const method = "POST"; // Use GET method
  const url = `${BASE_URL}currencies`; // Adjust the endpoint to match your API's URL

  try {
    const response = await HttpService.request({ method, data, url });

    if (response.status === 200) {
      return response.data; // Return the data if the response is successful
    } else {
      console.log("response?.message", response?.message);
      throw new Error(response?.message || "Error fetching payment methods");
      // throw new Error("Error fetching payment methods");
    }
  } catch (error: any) {
    console.log("error", error);
    throw new Error(error.message || "An error occurred");
  }
}
