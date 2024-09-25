import Anime from "../../entities/Anime";
import {
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import CriticScore from "../CriticScore";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@chakra-ui/react";
import { FaRegHeart, FaHeart, FaPlus, FaCheck } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { AnimeList } from "../../entities/AnimeList";
import { useIsLoggedInStore } from "../../store";
import useAnimeListPost from "../../hooks/useAnimeListPost";
import { useQueryClient } from "@tanstack/react-query";
import useAnimeListPut from "../../hooks/useAnimeListPut";
import AnimeListAddModal from "../AnimeListAddModal";

interface Props {
  anime: Anime;
  userAnimeList?: AnimeList[]; //only needed if user logged in
}

const AnimeCard = ({ anime, userAnimeList }: Props) => {
  const userData = useIsLoggedInStore((s) => s.userData); // get user data
  const isLoggedIn = useIsLoggedInStore((s) => s.isLoggedIn);

  const queryClient = useQueryClient(); // Get the query client to invalid query
  const navigate = useNavigate(); // Initialize navigate

  const { isOpen, onOpen, onClose } = useDisclosure(); //the the modal

  // Find the anime in the animeList array that matches the animeId
  const matchedAnimeList = userAnimeList?.find(
    (animeItem) => animeItem.anime.animeId === anime.mal_id.toString()
  );

  const { mutate: animeListPost } = useAnimeListPost(queryClient, navigate); //created new animeList for user
  const { mutate: animeListPut } = useAnimeListPut(
    queryClient,
    navigate,
    matchedAnimeList?._id || ""
  ); //patch the user animeList data

  const newAnimeList: AnimeList = {
    userId: userData._id,
    watchListIds: [],
    anime: {
      animeId: anime.mal_id.toString(),
      format: anime.type,
      title: anime.title,
      imageUrl: anime.images.jpg.image_url,
      genre: anime.genres.length == 0 ? "" : anime.genres[0].name,
      totalEpisodes: anime.episodes || 0,
      score: anime.score,
      year: anime.year || 0,
      status: anime.status,
    },
    currentEpisode: 0,
    status: "NA",
    favorite: true,
  };
  return (
    <>
      <AnimeListAddModal
        onClose={onClose}
        isOpen={isOpen}
        anime={anime}
        matchedAnimeList={matchedAnimeList}
      ></AnimeListAddModal>

      <Card position="relative">
        <Icon
          _hover={{
            transform: "scale(1.2)",
            transition: "transform .15s ease-in",
            cursor: "pointer",
          }}
          position="absolute"
          right="2"
          top="2"
          as={matchedAnimeList?.favorite ? FaHeart : FaRegHeart}
          color={matchedAnimeList?.favorite ? "red.500" : "white"}
          boxSize={5}
          onClick={() =>
            matchedAnimeList
              ? animeListPut({
                  favorite: !matchedAnimeList?.favorite,
                  updated_at: new Date(),
                })
              : animeListPost(newAnimeList)
          }
          // if not exist, upload it and add it to favorite,
          // if exist, use put to set favorite to !isAnimeFavorited
        />

        <Icon
          _hover={{
            transform: "scale(1.2)",
            transition: "transform .15s ease-in",
            cursor: "pointer",
          }}
          position="absolute"
          right="2"
          top="10"
          as={
            matchedAnimeList && matchedAnimeList.status !== "NA"
              ? FaCheck
              : FaPlus
          }
          color="white"
          boxSize={5}
          onClick={
            matchedAnimeList && matchedAnimeList.status !== "NA"
              ? undefined
              : () => (isLoggedIn ? onOpen() : navigate("/login"))
          } // Disable click if matchedAnime is true
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
