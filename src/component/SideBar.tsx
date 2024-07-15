import { Box, CloseButton, Flex, HStack, Show, VStack } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import GenreList from "./GenreList";
import { useMenuBarToggleStore } from "../store";

const SideBar = () => {
  const location = useLocation();
  const isRootRoute = location.pathname === "/";
  const isOpen = useMenuBarToggleStore((s) => s.isOpen);
  const setIsOpen = useMenuBarToggleStore((s) => s.setIsOpen);

  return (
    <Flex justifyContent="space-between">
      <VStack paddingY={2} align="flex-start">
        <Link onClick={setIsOpen} to="/animes/seasons">
          <Box fontSize="2xl">Season</Box>
        </Link>
        <Link onClick={setIsOpen} to="/animes/schedules">
          <Box fontSize="2xl">Schedules</Box>
        </Link>
        {isRootRoute && <GenreList></GenreList>}
      </VStack>

      {isOpen && <CloseButton onClick={setIsOpen} justifyContent="end" />}
    </Flex>
  );
};

export default SideBar;
