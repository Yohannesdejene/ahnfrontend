import HttpService from "./HttpService";
import { API_OPTIONS } from "@/types/auth";

const BASE_URL = HttpService.defaults.baseURL;

export async function apiGetService(urlData: string): Promise<any> {
  const method = "GET";
  const url = `${BASE_URL}/${urlData}`;
  return HttpService.request({ method, url });
}

export async function apiPostService(options: API_OPTIONS): Promise<any> {
  const method = "POST";
  const url = `${BASE_URL}${options.url}`;
  const data = options.data;
  return HttpService.request({ method, data, url });
}

export async function apiPutService(options: API_OPTIONS): Promise<any> {
  const method = "PUT";
  const url = `${BASE_URL}/${options.url}`;
  const data = options.data;
  return HttpService.request({ method, data, url });
}
