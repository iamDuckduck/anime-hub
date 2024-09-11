import { Box, Button, HStack, Image, Show, Text } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";

import SearchInput from "./SeachBar/SearchInput";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useIsLoggedInStore, useMenuBarToggleStore } from "../store";

const navBar = () => {
  // Accessing the store state
  const isLoggedIn = useIsLoggedInStore((s) => s.isLoggedIn);
  const isOpen = useMenuBarToggleStore((s) => s.setIsOpen);

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

      {isLoggedIn && (
        <Box padding={2}>
          <Link to="/profile">
            <Text fontWeight="bold">Profile</Text>
          </Link>
        </Box>
      )}

      {!isLoggedIn && (
        <Box padding={2}>
          <Link to="/login">
            <Text fontWeight="bold">Login</Text>
          </Link>
        </Box>
      )}

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
