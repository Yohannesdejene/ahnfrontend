import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { LOGIN } from "@/services/apiUrl/auth";

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    // Add other fields as needed
  };
}

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, LoginData>({
    mutationFn: async (credentials: LoginData) => {
      const response: AxiosResponse<AuthResponse> = await axios.post(
        `${LOGIN}`,
        credentials,
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Handle successful login, e.g., storing token, redirecting, etc.
      console.log("Login successful", data);

      // queryClient.invalidateQueries(["auth"]);
    },
    onError: (error) => {
      console.log("not logged in", error);
      // Handle error, e.g., showing error message
      console.error("Login error", error);
    },
  });
};
