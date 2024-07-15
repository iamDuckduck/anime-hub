import { Box } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import GenreList from "./GenreList";

const SideBar = () => {
  const location = useLocation();
  const isRootRoute = location.pathname === "/";
  return (
    <>
      <Link to="/animes/seasons">
        <Box fontSize="2xl">Season</Box>
      </Link>
      <Link to="/animes/schedules">
        <Box fontSize="2xl">Schedules</Box>
      </Link>
      {isRootRoute && <GenreList></GenreList>}
    </>
  );
};

export default SideBar;
