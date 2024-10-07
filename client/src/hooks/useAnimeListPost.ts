import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import APIClient from "../services/userService";
import { AnimeList } from "../entities/AnimeList";
import { AnimeListPost } from "../entities/AnimeListPost";
import { Id, toast } from "react-toastify";
import { useRef } from "react";

const animeListUploadClient = new APIClient<AnimeListPost, AnimeList>(
  "userAnimeList"
);

const useAnimeListPost = () => {
  const queryClient = useQueryClient(); // Get the query client to invalid query

  const toastIdRef = useRef<Id | null>(null); // Use a ref to store the toast ID or the value will be lost

  return useMutation<AnimeList, AxiosError, AnimeListPost>({
    mutationFn: (animeList: AnimeListPost) => {
      toastIdRef.current = toast.loading("adding...");
      return animeListUploadClient.post(
        // for new anime list
        animeList
      );
    },
    onSuccess: (newList) => {
      toast.update(toastIdRef.current || "", {
        render: "success!",
        type: "success",
        isLoading: false,
        autoClose: 2000, // Close after 2 seconds
      });

      // Optimistically update to the new value
      queryClient.setQueryData<AnimeList[]>(["animeLists"], (oldAnimeList) => {
        if (!oldAnimeList) return [newList];
        return [...oldAnimeList, newList];
      });
    },
    onError(error) {
      // Update the toast to success
      toast.update(toastIdRef.current || "", {
        render: error?.message,
        type: "error",
        isLoading: false,
        autoClose: 2000, // Close after 2 seconds
      });
    },
  });
};

export default useAnimeListPost;
