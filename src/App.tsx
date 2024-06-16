import { Box, Flex, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./component/navBar";
import GameGrid from "./component/GameGrid";
import GenreList from "./component/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import StatusSelector from "./component/StatusSelector";
import SortSelector from "./component/SortSelector";

export interface AnimeQuery {
  genre: Genre | null;
  status: string | null;
  sortOrder: string;
  searchText: string;
}
function App() {
  const [animeQuery, setAnimeQuery] = useState<AnimeQuery>({} as AnimeQuery);

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
        <NavBar
          onSearch={(searchText) =>
            setAnimeQuery({ ...animeQuery, searchText })
          }
        ></NavBar>
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList
            selectedGenre={animeQuery.genre}
            onSelectGenre={(genre) => setAnimeQuery({ ...animeQuery, genre })}
          ></GenreList>
        </GridItem>
      </Show>
      <GridItem area="main">
        <Flex paddingLeft={2} marginBottom={5}>
          <Box marginRight={5}>
            <StatusSelector
              selectedStatus={animeQuery.status}
              onSelectStatus={(status) =>
                setAnimeQuery({ ...animeQuery, status })
              }
            ></StatusSelector>
          </Box>
          <SortSelector
            sortOrder={animeQuery.sortOrder}
            onSelectSortOrder={(sortOrder) =>
              setAnimeQuery({ ...animeQuery, sortOrder })
            }
          ></SortSelector>
        </Flex>
        <GameGrid animeQuery={animeQuery}></GameGrid>
      </GridItem>
    </Grid>
  );
}

export default App;
