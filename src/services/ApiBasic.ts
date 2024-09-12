import HttpService, { HttpResetPasswordService } from "./HttpService";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
interface CREATE_YEAR_DATA_TYPE {
  EUC_year: string;
  ETH_year: string;
  start_date: string;
  end_date: string | null;
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
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
}
