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
        {isOpen && (
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
        )}
        <Link onClick={() => setIsOpen(false)} to="/animes/seasons">
          <Box fontSize="2xl">Season</Box>
        </Link>
        <Link onClick={() => setIsOpen(false)} to="/animes/schedules">
          <Box fontSize="2xl">Schedules</Box>
        </Link>
        {isRootRoute && <GenreList></GenreList>}
      </VStack>

      {isOpen && (
        <CloseButton onClick={() => setIsOpen(false)} justifyContent="end" />
      )}
    </Flex>
  );
};

export default SideBar;
