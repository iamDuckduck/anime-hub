import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../component/navBar";

const NavbarLayout = () => {
  return (
    <>
      <NavBar></NavBar>
      <Box>
        <Outlet></Outlet>
      </Box>
    </>
  );
};

export default NavbarLayout;
