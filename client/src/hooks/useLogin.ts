import { useMutation } from "@tanstack/react-query";
import { AuthData } from "../entities/SignUp";
import APIClient from "../services/userService";
import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";

const userAPIClient = new APIClient<AuthData, string>(`auth`);

const useLogin = (
  navigate: NavigateFunction,
  setIsLoggedIn: (state: boolean) => void
) =>
  useMutation<string, AxiosError<string>, AuthData>({
    mutationFn: (signUpData: AuthData) => userAPIClient.post(signUpData),
    onSuccess: () => {
      //set to true immediately or we have to wait for the navbar
      //auth mutation to change it which causes useless re-render
      setIsLoggedIn(true);
      navigate("/profile");
    },
  });

export default useLogin;
