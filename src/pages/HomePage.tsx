import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Show,
} from "@chakra-ui/react";
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
      <Box>
        <AnimeHeading></AnimeHeading>
        <HStack marginBottom={5} wrap="wrap">
          <StatusSelector></StatusSelector>
          <SortSelector></SortSelector>
          <SortDirection></SortDirection>
        </HStack>
      </Box>
      <AnimeGrid></AnimeGrid>
    </>
  );
};

export default HomePage;
