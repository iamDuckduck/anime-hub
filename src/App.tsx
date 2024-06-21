import { Box, Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import GameGrid from "./component/GameGrid";
import GameHeading from "./component/GameHeading";
import GenreList from "./component/GenreList";
import SortSelector from "./component/SortSelector";
import StatusSelector from "./component/StatusSelector";
import NavBar from "./component/navBar";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar></NavBar>
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
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
          </Flex>
        </Box>
        <GameGrid></GameGrid>
      </GridItem>
    </Grid>
  );
}

export default App;
