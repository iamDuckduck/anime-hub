import { Box, Button, HStack, Image, Show, Text } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import { Link, useLocation } from "react-router-dom";

import SearchInput from "./SeachBar/SearchInput";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useMenuBarToggleStore } from "../store";
import { useIsLoggedInStore } from "../store";

import { Avatar } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import useGetUser from "../hooks/useGetUser";

const navBar = () => {
  const isOpen = useMenuBarToggleStore((s) => s.setIsOpen);
  const isLoggedIn = useIsLoggedInStore((s) => s.isLoggedIn);
  // const userData = useIsLoggedInStore((s) => s.userData);

  const queryClient = useQueryClient();
  const location = useLocation();

  const setIsLoggedIn = useIsLoggedInStore((s) => s.setIsLoggedIn);
  const setUserData = useIsLoggedInStore((s) => s.setUserData);
  const { data, isLoading } = useGetUser(
    setIsLoggedIn,
    setUserData,
    queryClient
  ); // it returns error if user not auth

  // Invalidate the query on route change
  useEffect(() => {
    queryClient.invalidateQueries(["userInfo"]);
  }, [location.pathname]); // Invalidate on pathname change

  return (
    <HStack justifyContent="space-between" padding="10px">
      <Link to="/">
        <Image
          src={logo}
          boxSize="60px"
          objectFit="cover"
          _hover={{
            transform: "scale(1.03)",
            transition: "transform .15s ease-in",
            cursor: "pointer",
          }}
        ></Image>
      </Link>

      <SearchInput></SearchInput>

      <Box padding={2}>
        {!isLoading && (
          <Link to={isLoggedIn ? "/profile" : "/login"}>
            {isLoggedIn ? (
              <Avatar name="Dan Abrahmov" src={data?.profileImage} />
            ) : (
              <Text fontWeight="bold">Login</Text>
            )}
          </Link>
        )}
      </Box>

      <Show below="lg">
        <Button onClick={() => isOpen(true)}>
          <HamburgerIcon color="grey"></HamburgerIcon>
        </Button>
      </Show>
      {/* <ColorModeSwitch></ColorModeSwitch> */}
    </HStack>
  );
};

export default navBar;
