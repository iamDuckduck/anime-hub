import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../component/navBar";
import { Box, Heading, Text } from "@chakra-ui/react";

const errorPage = () => {
  const error = useRouteError();

  return (
    <>
      <NavBar></NavBar>
      <Box padding={5}>
        <Heading>Oops</Heading>
        <Text>
          {isRouteErrorResponse(error)
            ? "This page doesn't exist."
            : "An unexpected error occurred."}
        </Text>
      </Box>
    </>
  );
};

export default errorPage;
