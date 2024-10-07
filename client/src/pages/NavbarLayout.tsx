import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../component/navBar";
import { ToastContainer } from "react-toastify";

const NavbarLayout = () => {
  return (
    <>
      <NavBar></NavBar>
      <ToastContainer />
      <Box>
        <Outlet></Outlet>
      </Box>
    </>
  );
};

export default NavbarLayout;
