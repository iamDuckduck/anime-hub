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
import AnimeListModal from "../AnimeListModal";
import { UserFavorite } from "../../entities/UserFavorite";
import useUserFavoritePost from "../../hooks/useUserFavoritePost";
import useUserFavoriteDelete from "../../hooks/useUserFavoriteDelete";
import { UserFavoritePost } from "../../entities/UserFavoritePost";

interface Props {
  anime: Anime;
  userAnimeList?: AnimeList[]; //only needed if user logged in
  userFavorite?: UserFavorite[];
}

const AnimeCard = ({ anime, userAnimeList, userFavorite }: Props) => {
  const isLoggedIn = useIsLoggedInStore((s) => s.isLoggedIn);

  const { isOpen, onOpen, onClose } = useDisclosure(); //the the modal

  const navigate = useNavigate(); // Initialize navigate

  // Find the anime in the animeList array that matches the animeId
  const matchedAnimeList = userAnimeList?.find(
    (animeItem) => animeItem.anime.animeId === anime.mal_id.toString()
  );

  const matchedFavorite = userFavorite?.find(
    (animeItem) => animeItem.anime?.animeId === anime.mal_id.toString()
  );

  const { mutate: userFavoritePost, isLoading: isFavoritePostLoading } =
    useUserFavoritePost(); //created new animeList for user

  const { mutate: userFavoriteDelete, isLoading: isFavoriteDeleteLoading } =
    useUserFavoriteDelete(); //patch the user animeList data

  const newUserFavorite: UserFavoritePost = {
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
    favorite: true,
  };
  return (
    <>
      <AnimeListModal
        onClose={onClose}
        isOpen={isOpen}
        anime={anime}
        animeList={matchedAnimeList}
      ></AnimeListModal>

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
          as={matchedFavorite?.favorite ? FaHeart : FaRegHeart}
          color={matchedFavorite?.favorite ? "red.500" : "white"}
          boxSize={5}
          onClick={() =>
            matchedFavorite
              ? userFavoriteDelete(matchedFavorite._id)
              : userFavoritePost(newUserFavorite)
          }
          // if not exist, upload it and add it to favorite,
          // if exist, use put to set favorite to !isAnimeFavorited
          pointerEvents={
            isFavoritePostLoading || isFavoriteDeleteLoading ? "none" : "auto"
          }
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
          as={matchedAnimeList ? FaCheck : FaPlus}
          color="white"
          boxSize={5}
          onClick={() => (isLoggedIn ? onOpen() : navigate("/login"))} // Disable click if matchedAnime is true
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
