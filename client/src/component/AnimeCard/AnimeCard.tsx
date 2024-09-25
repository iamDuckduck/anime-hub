import Anime from "../../entities/Anime";
import {
  Alert,
  Box,
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import CriticScore from "../CriticScore";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@chakra-ui/react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import { AnimeList } from "../../entities/AnimeList";
import { useIsLoggedInStore } from "../../store";
import useAnimeListPost from "../../hooks/useAnimeListPost";
import { useQueryClient } from "@tanstack/react-query";
import useAnimeListPut from "../../hooks/useAnimeListPut";

interface Props {
  anime: Anime;
  animeList?: AnimeList[]; //only exist if user logged in
}

const AnimeCard = ({ anime, animeList }: Props) => {
  const userData = useIsLoggedInStore((s) => s.userData); // get user data
  const queryClient = useQueryClient(); // Get the query client to invalid query
  const navigate = useNavigate(); // Initialize navigate

  // Find the anime in the animeList array that matches the animeId
  const matchedAnime = animeList?.find(
    (animeItem) => animeItem.anime.animeId === anime.mal_id.toString()
  );

  const { mutate: animeListPost } = useAnimeListPost(
    queryClient,
    navigate,
    anime,
    userData
  ); //created new animeList for user
  const { mutate: animeListPut } = useAnimeListPut(
    queryClient,
    matchedAnime?._id || "",
    navigate
  ); //patch the user animeList data

  return (
    <>
      <Card position="relative">
        <Icon
          _hover={{
            transform: "scale(1.03)",
            transition: "transform .15s ease-in",
            cursor: "pointer",
          }}
          position="absolute"
          right="2"
          top="2"
          as={matchedAnime?.favorite ? FaHeart : FaRegHeart}
          color={matchedAnime?.favorite ? "red.500" : "white"}
          boxSize={5}
          onClick={() =>
            matchedAnime
              ? animeListPut({
                  favorite: !matchedAnime?.favorite,
                  updated_at: new Date(),
                })
              : animeListPost()
          }
          // if not exist, upload it and add it to favorite,
          // if exist, use put to set favorite to !isAnimeFavorited
        />

        <Image
          src={anime.images.jpg.image_url}
          width="100%"
          objectFit="cover"
          borderRadius="10px 10px 0 0"
        />

        <CardBody>
          <HStack justifyContent="space-between" marginBottom={3}>
            <Text>Released: {anime.year ? anime.year : "NA"}</Text>
            <Text>Rank: {anime.popularity}</Text>
            <CriticScore score={anime.score}></CriticScore>
          </HStack>
          <Heading fontSize="2xl">
            <Link to={`/animes/${anime.mal_id}/${anime.title}`}>
              {anime.title}
            </Link>
          </Heading>
        </CardBody>
      </Card>
    </>
  );
};

export default AnimeCard;
