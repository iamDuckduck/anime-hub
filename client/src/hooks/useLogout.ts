import { useNavigate } from "react-router-dom";
import { AuthData } from "../entities/SignUp";
import UserAPIClient from "../services/userService";
import { useMutation } from "@tanstack/react-query";
import { useIsLoggedInStore } from "../store";

const userAPIClient = new UserAPIClient<AuthData, AuthData>("auth/logout");

const useLogout = () => {
  const navigate = useNavigate(); // Initialize navigate
  const setIsLoggedIn = useIsLoggedInStore((s) => s.setIsLoggedIn);
  return useMutation({
    mutationFn: () => userAPIClient.post(),
    onSuccess: () => {
      setIsLoggedIn(null); //undefinded or null will set login to false
      navigate("/login"); // Redirecting to login page after logout
    },
  });
};

export default useLogout;
