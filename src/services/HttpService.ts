import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getSessionKey } from "@/utils/sessionManager";

// Define a type for the Axios instances
type HttpServiceType = AxiosInstance;

// Create a class to manage the HTTP service
class HttpServiceManager {
  private static instance: HttpServiceManager;
  private httpService: HttpServiceType;
  private currentToken: string | null | undefined;

  private constructor() {
    // Initialize Axios instance
    this.httpService = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    });

    // Set initial token
    this.currentToken = getSessionKey();
    this.updateAuthorizationHeader();

    // Add request interceptor
    this.httpService.interceptors.request.use(
      (config: any) => {
        const latestToken = getSessionKey();
        if (latestToken !== this.currentToken) {
          this.currentToken = latestToken;
          this.updateAuthorizationHeader();
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  // Singleton pattern to ensure single instance
  public static getInstance(): HttpServiceManager {
    if (!HttpServiceManager.instance) {
      HttpServiceManager.instance = new HttpServiceManager();
    }
    return HttpServiceManager.instance;
  }

  // Update authorization header
  private updateAuthorizationHeader() {
    if (this.currentToken) {
      this.httpService.defaults.headers.common["Authorization"] =
        `Bearer ${this.currentToken}`;
    } else {
      delete this.httpService.defaults.headers.common["Authorization"];
    }
  }

  // Get the Axios instance
  public getHttpService(): HttpServiceType {
    return this.httpService;
  }

  // Method to manually update token if needed
  public updateToken(token: string | null | undefined) {
    this.currentToken = token;
    this.updateAuthorizationHeader();
  }
}

// Create and export the HTTP service
const httpServiceManager = HttpServiceManager.getInstance();
const HttpService = httpServiceManager.getHttpService();

export default HttpService;

// Export additional method to update token if needed
export const updateAuthToken = (token: string | null | undefined) => {
  httpServiceManager.updateToken(token);
};
