import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import APIClient from "../services/userService";
import { useNavigate } from "react-router-dom";
import { AnimeListPutRequest } from "../entities/AnimeListPutRequest";
import { AnimeList } from "../entities/AnimeList";
import { Id, toast } from "react-toastify";
import { useRef } from "react";

const animeListUploadClient = new APIClient<AnimeListPutRequest, AnimeList>(
  "userAnimeList"
);

const useAnimeListPut = () => {
  const queryClient = useQueryClient(); // Get the query client to invalid query
  const navigate = useNavigate(); // Initialize navigate
  const toastIdRef = useRef<Id | null>(null); // Use a ref to store the toast ID or the value will be lost

  return useMutation<
    AnimeList,
    AxiosError,
    { animePutData: AnimeListPutRequest; id: string }
  >({
    mutationFn: ({ animePutData, id }) => {
      toastIdRef.current = toast.loading("updating...");
      return animeListUploadClient.put(animePutData, id);
    },
    onSuccess: (updatedAnimeList: AnimeList) => {
      toast.update(toastIdRef.current || "", {
        render: "success!",
        type: "success",
        isLoading: false,
        autoClose: 2000, // Close after 2 seconds
      });

      // Optimistically update to the new value
      queryClient.setQueryData<AnimeList[]>(["animeLists"], (oldAnimeList) => {
        if (!oldAnimeList) return [updatedAnimeList];
        return [...oldAnimeList, updatedAnimeList];
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
      if (error.status == 401) navigate("/login");
      console.error("An error occurred during anime list put:", error);
    },
  });
};

export default useAnimeListPut;
