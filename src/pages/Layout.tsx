import { Box, Grid, GridItem } from "@chakra-ui/react";
import NavBar from "../component/navBar";
import { Outlet } from "react-router-dom";

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
