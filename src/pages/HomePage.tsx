import { Box, Button, Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import GenreList from "../component/GenreList";
import AnimeHeading from "../component/AnimeHeading";
import StatusSelector from "../component/Sorting/StatusSelector";
import SortSelector from "../component/Sorting/SortSelector";
import AnimeGrid from "../component/AnimeGrid";
import SortDirection from "../component/Sorting/SortDirection";
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
            <AnimeHeading></AnimeHeading>
            <Flex marginBottom={5}>
              <Box marginRight={5}>
                <StatusSelector></StatusSelector>
              </Box>
              <SortSelector></SortSelector>
              <SortDirection></SortDirection>
            </Flex>
          </Box>
          <AnimeGrid></AnimeGrid>
        </GridItem>
      </Grid>
    </>
  );
};

export default HomePage;
