import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import APIClient, { userData } from "../services/userService";
import { AnimeList } from "../entities/AnimeList";
import { NavigateFunction } from "react-router-dom";
import Anime from "../entities/Anime";

const animeListUploadClient = new APIClient<AnimeList, AnimeList>(
  "userAnimeList"
);

const useAnimeListPost = (
  queryClient: any,
  navigate: NavigateFunction,
  anime: Anime,
  userData: userData
) => {
  return useMutation<AnimeList, AxiosError>({
    mutationFn: () => {
      return animeListUploadClient.post(
        // for new anime list
        {
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
          status: "Planning",
          favorite: true,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["animeList"]); //refetch the newest state
    },
    onError() {
      navigate("/login");
    },
  });
};

export default useAnimeListPost;
