import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import SideBar from "../component/SideBar";

const HomeLayout = () => {
  const location = useLocation();
  const isRootRoute = location.pathname === "/";
  return (
    <>
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
