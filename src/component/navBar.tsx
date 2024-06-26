import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { Link, useNavigate } from "react-router-dom";

const navBar = () => {
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
      <ColorModeSwitch></ColorModeSwitch>
    </HStack>
  );
};

export default navBar;
