import { Box, Button, Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import GenreList from "../component/GenreList";
import GameHeading from "../component/GameHeading";
import StatusSelector from "../component/StatusSelector";
import SortSelector from "../component/SortSelector";
import GameGrid from "../component/GameGrid";
import SortDirection from "../component/SortDirection";
import { Link } from "react-router-dom";

const HomePage = () => {
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
            <Link to="/animes/schedules">
              <Box fontSize="2xl">Schedules</Box>
            </Link>
            <GenreList></GenreList>
          </GridItem>
        </Show>
        <GridItem area="main">
          <Box paddingLeft={2}>
            <GameHeading></GameHeading>
            <Flex marginBottom={5}>
              <Box marginRight={5}>
                <StatusSelector></StatusSelector>
              </Box>
              <SortSelector></SortSelector>
              <SortDirection></SortDirection>
            </Flex>
          </Box>
          <GameGrid></GameGrid>
        </GridItem>
      </Grid>
    </>
  );
};

export default HomePage;
