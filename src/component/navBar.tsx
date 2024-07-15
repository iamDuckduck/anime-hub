import { Button, HStack, Image, Show } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import { Link } from "react-router-dom";
import SearchInput from "./SeachBar/SearchInput";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useMenuBarToggleStore } from "../store";

const navBar = () => {
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
      <Show below="lg">
        <Button onClick={isOpen}>
          <HamburgerIcon color="grey"></HamburgerIcon>
        </Button>
      </Show>
      {/* <ColorModeSwitch></ColorModeSwitch> */}
    </HStack>
  );
};

export default navBar;
