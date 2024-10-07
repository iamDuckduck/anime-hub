import { useNavigate } from "react-router-dom";
import { AuthData } from "../entities/SignUp";
import UserAPIClient from "../services/userService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIsLoggedInStore } from "../store";
import { toast } from "react-toastify";

const userAPIClient = new UserAPIClient<AuthData, AuthData>("auth/logout");

const useLogout = () => {
  const navigate = useNavigate(); // Initialize navigate
  const setIsLoggedIn = useIsLoggedInStore((s) => s.setIsLoggedIn);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => userAPIClient.post(),
    onSuccess: () => {
      toast.success("logout successfully");
      queryClient.setQueryData(["animeLists"], null);
      queryClient.setQueryData(["userFavorite"], null);

      setIsLoggedIn(null); //undefinded or null will set login to false
      navigate("/login"); // Redirecting to login page after logout
    },
  });
};

export default useLogout;
