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
    </>
  );
};

export default HomePage;
