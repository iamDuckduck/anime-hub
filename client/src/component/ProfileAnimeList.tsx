import { Grid, GridItem, Img, Icon, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AnimeListModal from "./AnimeListModal";
import { AnimeList } from "../entities/AnimeList";
import useAnimeListPut from "../hooks/useAnimeListPut";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  animeList: AnimeList;
}

const UserProfileList = ({ animeList }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); //the the modal
  const queryClient = useQueryClient(); // Get the query client to invalid query
  const navigate = useNavigate(); // Initialize navigate
  const { mutate: animeListPut } = useAnimeListPut(queryClient, navigate); //patch the user animeList data

  const handleUpdateEpisode = (currentEp: number, id: string) => {
    animeListPut({
      animePutData: { currentEpisode: currentEp, updated_at: new Date() },
      id: id,
    });
  };
  return (
    <Grid
      _hover={{
        transform: "scale(1.02)",
        transition: "transform .15s ease-in",
        cursor: "pointer",
      }}
      fontSize={18}
      templateColumns="40%  repeat(2, 1fr)"
      gap={6}
      paddingY={5}
    >
      <GridItem display="flex" flexDirection="row">
        <Img
          mr={5}
          boxSize="60px"
          objectFit="cover"
          src={animeList.anime.imageUrl}
          onClick={onOpen}
        ></Img>
        <AnimeListModal
          onClose={onClose}
          isOpen={isOpen}
          anime={animeList.anime}
          animeList={animeList}
        ></AnimeListModal>
        <Link
          to={`/animes/${animeList.anime.animeId}/${animeList.anime.title}`}
        >
          {animeList.anime.title}
        </Link>
      </GridItem>
      {animeList.status == "Completed" ? (
        <GridItem textAlign="center">{animeList.currentEpisode}</GridItem>
      ) : (
        <GridItem textAlign="center">
          <Icon
            _hover={{
              transform: "scale(1.2)",
              transition: "transform .15s ease-in",
              cursor: "pointer",
            }}
            as={FaMinus}
            color="white"
            mr={2}
            boxSize={3}
            onClick={
              animeList.currentEpisode == 0
                ? undefined
                : () =>
                    handleUpdateEpisode(
                      --animeList.currentEpisode,
                      animeList._id || ""
                    )
            }
          />
          {animeList.currentEpisode}/{animeList.anime.totalEpisodes}
          <Icon
            _hover={{
              transform: "scale(1.2)",
              transition: "transform .15s ease-in",
              cursor: "pointer",
            }}
            as={FaPlus}
            color="white"
            ml={2}
            boxSize={3}
            onClick={
              animeList.currentEpisode == animeList.anime.totalEpisodes
                ? undefined
                : () =>
                    handleUpdateEpisode(
                      ++animeList.currentEpisode,
                      animeList._id || ""
                    )
            }
          />
        </GridItem>
      )}
      <GridItem textAlign="center">{animeList.anime.genre}</GridItem>
    </Grid>
  );
};

export default UserProfileList;
