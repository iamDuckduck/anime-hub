import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../component/navBar";
import SideBar from "../component/SideBar";
import { useMenuBarToggleStore } from "../store";

const Layout = () => {
  const isOpen = useMenuBarToggleStore((s) => s.isOpen);

  return (
    <>
      {isOpen && (
        <Box
          position="fixed"
          zIndex="1"
          backgroundColor="black"
          width="100vw"
          height="100vh"
          top="0"
          left="0"
          padding={5}
        >
          <SideBar></SideBar>
        </Box>
      )}
      <NavBar></NavBar>
      <Box padding={5}>
        <Outlet></Outlet>
      </Box>
    </>
  );
};

export default Layout;
