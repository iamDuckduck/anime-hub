import { Box, Flex, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./component/navBar";
import GameGrid from "./component/GameGrid";
import GenreList from "./component/GenreList";
import { useState } from "react";
import StatusSelector from "./component/StatusSelector";
import SortSelector from "./component/SortSelector";
import GameHeading from "./component/GameHeading";

export interface AnimeQuery {
  genreId?: number;
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
            selectedGenreId={animeQuery.genreId}
            onSelectGenre={(genre) =>
              setAnimeQuery({ ...animeQuery, genreId: genre.mal_id })
            }
          ></GenreList>
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={2}>
          <GameHeading animeQuery={animeQuery}></GameHeading>
          <Flex marginBottom={5}>
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
        </Box>
        <GameGrid animeQuery={animeQuery}></GameGrid>
      </GridItem>
    </Grid>
  );
}

export default App;
