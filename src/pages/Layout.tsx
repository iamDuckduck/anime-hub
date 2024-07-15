import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../component/navBar";

const Layout = () => {
  return (
    <>
      <NavBar></NavBar>
      <Box padding={5}>
        <Outlet></Outlet>
      </Box>
    </>
  );
};

export default Layout;
