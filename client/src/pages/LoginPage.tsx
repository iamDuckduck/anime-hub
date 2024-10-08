import React, { useRef } from "react";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom"; // Import useNavigate
import useLogin from "../hooks/useLogin";
import { useIsLoggedInStore } from "../store";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const isLoggedIn = useIsLoggedInStore((s) => s.isLoggedIn);
  const navigate = useNavigate(); // Initialize navigate

  const { mutate, isLoading: mutateIsloading } = useLogin();

  if (isLoggedIn) return <Navigate to="/profile" replace />;

  return (
    <Box>
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
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              mutate({
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
            disabled={mutateIsloading}
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
