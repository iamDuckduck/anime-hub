import { useMutation } from "@tanstack/react-query";
import { AuthData } from "../entities/SignUp";
import UserAPIClient from "../services/userService";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useIsLoggedInStore } from "../store";
import { Id, toast } from "react-toastify";
import { useRef } from "react";

interface loginRes {
  message: string;
  token: string;
}
const userAPIClient = new UserAPIClient<AuthData, loginRes>(`auth`);

const useLogin = () => {
  const navigate = useNavigate(); // Initialize navigate
  const setIsLoggedIn = useIsLoggedInStore((s) => s.setIsLoggedIn);
  const toastIdRef = useRef<Id | null>(null); // Use a ref to store the toast ID or the value will be lost

  return useMutation<loginRes, AxiosError<string>, AuthData>({
    mutationFn: (signUpData: AuthData) => {
      toastIdRef.current = toast.loading("Logging in...");
      return userAPIClient.post(signUpData);
    },
    onSuccess: (res: loginRes) => {
      // Update the toast to success
      toast.update(toastIdRef.current || "", {
        render: "Login successful!",
        type: "success",
        isLoading: false,
        autoClose: 2000, // Close after 2 seconds
      });
      setIsLoggedIn(res.token); //undefinded or null will set login to false
      navigate("/profile");
    },
    onError(error) {
      // Update the toast to success
      toast.update(toastIdRef.current || "", {
        render: error?.response?.data || error?.message,
        type: "error",
        isLoading: false,
        autoClose: 2000, // Close after 2 seconds
      });
    },
  });
};

export default useLogin;
