import {
  Box,
  Button,
  HStack,
  Image,
  Show,
  Spinner,
  Text,
} from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import { Link, useLocation } from "react-router-dom";
import SearchInput from "./SeachBar/SearchInput";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useIsLoggedInStore, useMenuBarToggleStore } from "../store";
import { Avatar } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import useGetUser from "../hooks/useGetUser";
import SideBar from "./SideBar";

const navBar = () => {
  const isOpen = useMenuBarToggleStore((s) => s.isOpen);
  const setIsOpen = useMenuBarToggleStore((s) => s.setIsOpen);

  const isLoggedIn = useIsLoggedInStore((s) => s.isLoggedIn);

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
    <>
      <HStack justifyContent="space-between" padding="10px">
        <Show below="lg" ssr={false}>
          <Button onClick={() => setIsOpen(true)}>
            <HamburgerIcon color="grey"></HamburgerIcon>
          </Button>
        </Show>

        <Show above="lg" ssr={false}>
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
            />
          </Link>
        </Show>

        <SearchInput></SearchInput>
        <Show above="lg" ssr={false}>
          <Box padding={2} width="80px">
            {isLoading ? (
              <Spinner />
            ) : (
              <Link to={isLoggedIn ? "/profile" : "/login"}>
                {isLoggedIn ? (
                  <Avatar name="Dan Abrahmov" src={data?.profileImage} />
                ) : (
                  <Text fontWeight="bold">Login</Text>
                )}
              </Link>
            )}
          </Box>
        </Show>

        {isOpen && (
          <Box
            position="fixed"
            zIndex="1"
            backgroundColor="black"
            width="100vw"
            height="100vh"
            top="0"
            left="0"
            padding={5}
          >
            <SideBar></SideBar>
          </Box>
        )}

        {/* <ColorModeSwitch></ColorModeSwitch> */}
      </HStack>
    </>
  );
};

export default navBar;
