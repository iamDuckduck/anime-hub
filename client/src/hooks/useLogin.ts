import { useMutation } from "@tanstack/react-query";
import { AuthData } from "../entities/SignUp";
import APIClient from "../services/userService";
import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";

const userAPIClient = new APIClient<AuthData, string>(`auth`);

const useLogin = (navigate: NavigateFunction) =>
  useMutation<string, AxiosError<string>, AuthData>({
    mutationFn: (signUpData: AuthData) => userAPIClient.post(signUpData),
    onSuccess: () => {
      navigate("/profile");
    },
  });

export default useLogin;
