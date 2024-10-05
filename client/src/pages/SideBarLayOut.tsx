import { Grid, GridItem, Show } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SideBar from "../component/SideBar";

const SideBarLayout = () => {
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
      padding={{ base: "10px", lg: "26px" }}
    >
      <GridItem area="main">
        <Outlet></Outlet>
      </GridItem>

      {/* Sidebar is only visible on large screens (lg and above) or it still takes up the */}
      <Show above="lg" ssr={false}>
        <GridItem area="aside">
          <SideBar />
        </GridItem>
      </Show>
    </Grid>
  );
};
export default SideBarLayout;
