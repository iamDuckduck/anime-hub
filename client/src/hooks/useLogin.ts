import { useMutation } from "@tanstack/react-query";
import { AuthData } from "../entities/SignUp";
import UserAPIClient from "../services/userService";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useIsLoggedInStore } from "../store";

interface loginRes {
  message: string;
  token: string;
}
const userAPIClient = new UserAPIClient<AuthData, loginRes>(`auth`);

const useLogin = () => {
  const navigate = useNavigate(); // Initialize navigate
  const setIsLoggedIn = useIsLoggedInStore((s) => s.setIsLoggedIn);
  return useMutation<loginRes, AxiosError<string>, AuthData>({
    mutationFn: (signUpData: AuthData) => userAPIClient.post(signUpData),
    onSuccess: (res: loginRes) => {
      //auth mutation to change it which causes useless re-render
      setIsLoggedIn(res.token); //undefinded or null will set login to false
      navigate("/profile");
    },
  });
};

export default useLogin;
