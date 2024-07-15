import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../component/SideBar";
import { useMenuBarToggleStore } from "../store";

const HomeLayout = () => {
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
      <Grid
        templateAreas={{
          base: `"main"`,
          lg: `"aside main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "200px 1fr",
        }}
      >
        <Show above="lg">
          <GridItem area="aside">
            <SideBar></SideBar>
          </GridItem>
        </Show>
        <GridItem area="main">
          <Outlet></Outlet>
        </GridItem>
      </Grid>
    </>
  );
};
export default HomeLayout;
