import React, { useRef, useState } from "react";
import useAnimeTop from "../hooks/useAnimeTop";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import APIClient from "../services/userService";
import { AuthData } from "../entities/SignUp";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useIsLoggedInStore } from "../store";

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize navigate

  // Accessing the store action
  const setIsLoggedIn = useIsLoggedInStore((state) => state.setIsLoggedIn);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [hasResponseError, setHasResponseError] = useState(false);
  const [hasNonResponseError, setHasNonResponseError] = useState(false);
  const userAPIClient = new APIClient<AuthData, string>(`auth`);

  const signUpMutation = useMutation<string, AxiosError<string>, AuthData>({
    mutationFn: (signUpData: AuthData) => userAPIClient.post(signUpData),
    onSuccess: (token: string) => {
      // Save token to localStorage

      if (token) {
        localStorage.setItem("token", token);
        setIsLoggedIn();
      }

      navigate("/profile");
    },
    onError: (error) => {
      if (error.response?.data) {
        setHasResponseError(true);
      } else {
        setHasNonResponseError(true);
      }
    },
  });

  return (
    <Box>
      {hasResponseError && ( //return the response if exist
        <Alert status="error" marginBottom={10}>
          <AlertIcon />
          {signUpMutation.error?.response?.data}
        </Alert>
      )}
      {hasNonResponseError && ( //return the error message if response not exist
        <Alert status="error" marginBottom={10}>
          <AlertIcon />
          {signUpMutation.error?.message}
        </Alert>
      )}
      <Box display="flex" justifyContent="center">
        <Flex
          direction="column"
          p={[5, 10]}
          rounded="md"
          shadow="lg"
          bg="gray.700" // Light grey background for the form
          width={["90%", "500px"]} // Responsive width, 90% for mobile, 500px for larger screens
          height={["50%", "350px"]}
          justifyContent="center"
        >
          <form
            className="row mb-3"
            onSubmit={(event) => {
              event.preventDefault();
              signUpMutation.mutate({
                email: emailInputRef.current?.value || "",
                password: passwordInputRef.current?.value || "",
              });
            }}
          >
            <Input
              ref={emailInputRef}
              placeholder="Email"
              type="Email"
              mb={4}
            />
            <Input
              ref={passwordInputRef}
              placeholder="Password"
              type="password"
              mb={10}
            />
            <Button
              variant="outline"
              colorScheme="blackAlpha"
              borderColor="whiteAlpha.800"
              color="whiteAlpha.900"
              mb={4}
              _hover={{ bg: "gray.900" }} // Light grey on hover
              type="submit" // Add type="submit" to the button
            >
              Login
            </Button>
          </form>

          <Button
            disabled={signUpMutation.isLoading}
            variant="outline"
            colorScheme="blackAlpha"
            borderColor="whiteAlpha.800"
            color="whiteAlpha.900"
            mb={4}
            _hover={{ bg: "gray.900" }} // Light grey on hover
            onClick={() => navigate("/signup")} // Navigate to signup page on click
          >
            Sign Up
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default LoginPage;
