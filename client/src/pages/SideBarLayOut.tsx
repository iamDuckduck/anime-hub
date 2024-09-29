import { Grid, GridItem, Show } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SideBar from "../component/SideBar";

const SideBarLayout = () => {
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
        padding={5}
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
export default SideBarLayout;
