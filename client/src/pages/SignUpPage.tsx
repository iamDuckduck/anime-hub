import { useRef } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom"; // Import useNavigate
import useSignUpMutation from "../hooks/useSignUp";
import useGetUser from "../hooks/useGetUser";
const SignUpPage = () => {
  const userNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { mutate, error: signupErr } = useSignUpMutation();

  const { isLoading: authIsLoading, error: authError } = useGetUser(); // it returns error if user not auth

  if (authIsLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!authError) return <Navigate to="/profile" replace />;

  return (
    <Box>
      {signupErr && ( //return the response if exist
        <Alert status="error" marginBottom={10}>
          <AlertIcon />
          {signupErr?.response?.data}
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
          height={["50%", "400px"]}
          justifyContent="center"
        >
          <form
            className="row mb-3"
            onSubmit={(event) => {
              event.preventDefault();
              mutate({
                userName: userNameInputRef.current?.value || "",
                email: emailInputRef.current?.value || "",
                password: passwordInputRef.current?.value || "",
              });
            }}
          >
            <Input
              ref={userNameInputRef}
              placeholder="User Name"
              type="userName"
              mb={4}
            />
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
              Sign Up
            </Button>
          </form>

          <Box mb={2}>Already have account?</Box>
          <Button
            variant="solid"
            colorScheme="blackAlpha"
            bg="black"
            color="white"
            mb={4}
            _hover={{ bg: "gray.900" }} // Slightly lighter black on hover
            onClick={() => navigate("/login")} // Navigate to signup page on click
          >
            Login
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default SignUpPage;
