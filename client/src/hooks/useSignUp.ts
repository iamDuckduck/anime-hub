import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuthData } from "../entities/SignUp";
import APIClient from "../services/userService";
import { useNavigate } from "react-router-dom";

// Accessing the store action

const userAPIClient = new APIClient<AuthData, AuthData>("users");

const useSignUpMutation = () => {
  const navigate = useNavigate(); // Initialize navigate

  return useMutation<AuthData, AxiosError<string>, AuthData>({
    mutationFn: (signUpdata: AuthData) => userAPIClient.post(signUpdata),
    onSuccess: () => {
      navigate("/profile");
    },
  });
};

export default useSignUpMutation;
