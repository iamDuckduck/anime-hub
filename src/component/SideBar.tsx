import { Box } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import GenreList from "./GenreList";

const sideBar = () => {
  const location = useLocation();
  const isRootRoute = location.pathname === "/";
  return (
    <>
      <Link to="/animes/schedules">
        <Box fontSize="2xl">Schedules</Box>
      </Link>
      {isRootRoute && <GenreList></GenreList>}
    </>
  );
};

export default sideBar;
