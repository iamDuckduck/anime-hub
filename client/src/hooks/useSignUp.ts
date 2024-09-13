import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuthData } from "../entities/SignUp";
import { useIsLoggedInStore } from "../store";
import APIClient from "../services/userService";
import { useNavigate } from "react-router-dom";

// Accessing the store action

const userAPIClient = new APIClient<AuthData, AuthData>("users");

const useSignUpMutation = () => {
  const setIsLoggedIn = useIsLoggedInStore((state) => state.setIsLoggedIn);
  const navigate = useNavigate(); // Initialize navigate

  return useMutation<AuthData, AxiosError<string>, AuthData>({
    mutationFn: (signUpdata: AuthData) => userAPIClient.post(signUpdata),
    onSuccess: (data: AuthData) => {
      // Save token to localStorage
      const token = data.token; // Assuming token is in the response
      if (token) {
        localStorage.setItem("token", token);
        setIsLoggedIn();
      }

      navigate("/profile");
    },
  });
};

export default useSignUpMutation;
