import axios, { AxiosInstance } from "axios";
import { getSessionKey } from "@/utils/sessionManager";

// Define a type for the Axios instances
type HttpServiceType = AxiosInstance;

const accessToken: string | null | undefined = getSessionKey();

const HttpService: HttpServiceType = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});


// Set the Authorization header if the access token is available
if (accessToken) {
  HttpService.defaults.headers.common["Authorization"] =
    `Bearer ${accessToken}`;
}

export default HttpService;
