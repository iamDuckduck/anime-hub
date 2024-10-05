import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuthData } from "../entities/SignUp";
import UserAPIClient from "../services/userService";
import { useNavigate } from "react-router-dom";
import { useIsLoggedInStore } from "../store";

// Accessing the store action

const userAPIClient = new UserAPIClient<AuthData, AuthData>("users");

const useSignUpMutation = () => {
  const navigate = useNavigate(); // Initialize navigate
  const setIsLoggedIn = useIsLoggedInStore((s) => s.setIsLoggedIn);
  return useMutation<AuthData, AxiosError<string>, AuthData>({
    mutationFn: (signUpdata: AuthData) => userAPIClient.post(signUpdata),
    onSuccess: (res: AuthData) => {
      setIsLoggedIn(res.token); //undefinded or null will set login to false
      navigate("/profile");
    },
  });
};

export default useSignUpMutation;
