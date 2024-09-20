import { Box, Button, HStack, Image, Show, Text } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";

import SearchInput from "./SeachBar/SearchInput";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useIsLoggedInStore, useMenuBarToggleStore } from "../store";
import useUserInfo from "../hooks/useGetUser";

const navBar = () => {
  const isOpen = useMenuBarToggleStore((s) => s.setIsOpen);
  const { isLoading, error } = useUserInfo(); // should avoid auto retrying

  if (isLoading) return <></>;

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
        <Link to={error ? "/login" : "/profile"}>
          <Text fontWeight="bold">{error ? "Login" : "Profile"}</Text>
        </Link>
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
