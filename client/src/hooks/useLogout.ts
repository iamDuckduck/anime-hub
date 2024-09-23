import { NavigateFunction } from "react-router-dom";
import { AuthData } from "../entities/SignUp";
import APIClient from "../services/userService";
import { useMutation } from "@tanstack/react-query";

const userAPIClient = new APIClient<AuthData, AuthData>("auth/logout");

const useLogout = (navigate: NavigateFunction) =>
  useMutation({
    mutationFn: () => userAPIClient.post(),
    onSuccess: () => {
      navigate("/login"); // Redirecting to login page after logout
    },
  });

export default useLogout;
