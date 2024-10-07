import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import APIClient from "../services/userService";
import { AnimeList } from "../entities/AnimeList";
import { useNavigate } from "react-router-dom";
import { Id, toast } from "react-toastify";
import { useRef } from "react";

const animeListDeleteClient = new APIClient<AnimeList>("userAnimeList");

const useAnimeListDelete = () => {
  const queryClient = useQueryClient(); // Get the query client to invalid query
  const navigate = useNavigate(); // Initialize navigate
  const toastIdRef = useRef<Id | null>(null); // Use a ref to store the toast ID or the value will be lost

  return useMutation<AnimeList, AxiosError, string>({
    mutationFn: (id: string) => {
      toastIdRef.current = toast.loading("deleting...");
      return animeListDeleteClient.delete(id);
    },
    onSuccess: (deleteAnimeList) => {
      toast.update(toastIdRef.current || "", {
        render: "success!",
        type: "success",
        isLoading: false,
        autoClose: 2000, // Close after 2 seconds
      });

      // Optimistically update to the new value
      queryClient.setQueryData<AnimeList[]>(["animeLists"], (oldAnimeLists) => {
        return oldAnimeLists?.filter(
          (animeList) => animeList._id != deleteAnimeList._id
        );
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
      console.error("An error occurred during favorite delete:", error);
    },
  });
};

export default useAnimeListDelete;
