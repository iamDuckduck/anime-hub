import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import UserAPIClient from "../services/userService";
import { useNavigate } from "react-router-dom";
import { UserFavorite } from "../entities/UserFavorite";
import { Id, toast } from "react-toastify";
import { useRef } from "react";

const userFavoriteDeleteClient = new UserAPIClient<UserFavorite>("favorite");

const useUserFavoriteDelete = () => {
  const queryClient = useQueryClient(); // Get the query client to invalid query
  const navigate = useNavigate(); // Initialize navigate
  const toastIdRef = useRef<Id | null>(null); // Use a ref to store the toast ID or the value will be lost

  return useMutation<UserFavorite, AxiosError, string>({
    mutationFn: (id: string) => {
      toastIdRef.current = toast.loading("dropping...");
      return userFavoriteDeleteClient.delete(id);
    },
    onSuccess: (deletedFavorite: UserFavorite) => {
      toast.update(toastIdRef.current || "", {
        render: "success!",
        type: "success",
        isLoading: false,
        autoClose: 2000, // Close after 2 seconds
      });
      // Optimistically update to the new value
      queryClient.setQueryData<UserFavorite[]>(
        ["userFavorite"],
        (oldFavorites) => {
          return oldFavorites?.filter(
            (favorite) => favorite._id !== deletedFavorite._id
          );
        }
      );
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
      console.error("An error occurred during favorite put:", error);
    },
  });
};

export default useUserFavoriteDelete;
