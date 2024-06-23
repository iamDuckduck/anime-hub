import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "../component/navBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </>
  );
};

export default Layout;
