import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  signup,
  login,
  SignupData,
  LoginData,
  AuthResponse,
} from "./services/auth";

export const useSignupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, SignupData>({
    mutationFn: signup,
    onSuccess: (data) => {
      // Handle successful signup, e.g., storing token, redirecting, etc.
      console.log("Signup successful", data);
      queryClient.invalidateQueries(["auth"]);
    },
    onError: (error) => {
      // Handle error, e.g., showing error message
      console.error("Signup error", error);
    },
  });
};
