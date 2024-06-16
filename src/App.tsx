import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./component/navBar";
import GameGrid from "./component/GameGrid";
import GenreList from "./component/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import StatusSelector from "./component/StatusSelector";

function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

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
          <GenreList
            selectedGenre={selectedGenre}
            onSelectGenre={(genre) => setSelectedGenre(genre)}
          ></GenreList>
        </GridItem>
      </Show>
      <GridItem area="main">
        <StatusSelector
          selectedStatus={selectedStatus}
          onSelectStatus={(string) => setSelectedStatus(string)}
        ></StatusSelector>
        <GameGrid
          selectedStatus={selectedStatus}
          selectedGenre={selectedGenre}
        ></GameGrid>
      </GridItem>
    </Grid>
  );
}

export default App;
