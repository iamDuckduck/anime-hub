import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuthData } from "../entities/SignUp";
import UserAPIClient from "../services/userService";
import { useNavigate } from "react-router-dom";
import { useIsLoggedInStore } from "../store";
import { useRef } from "react";
import { Id, toast } from "react-toastify";

// Accessing the store action

const userAPIClient = new UserAPIClient<AuthData, AuthData>("users");

const useSignUpMutation = () => {
  const navigate = useNavigate(); // Initialize navigate
  const setIsLoggedIn = useIsLoggedInStore((s) => s.setIsLoggedIn);
  const toastIdRef = useRef<Id | null>(null); // Use a ref to store the toast ID or the value will be lost

  return useMutation<AuthData, AxiosError<string>, AuthData>({
    mutationFn: (signUpdata: AuthData) => {
      toastIdRef.current = toast.loading("Signning in...");
      return userAPIClient.post(signUpdata);
    },
    onSuccess: (res: AuthData) => {
      // Update the toast to success
      toast.update(toastIdRef.current || "", {
        render: "SignIn successful!",
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

export default useSignUpMutation;
