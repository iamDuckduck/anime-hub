import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import UserAPIClient from "../services/userService";
import { useNavigate } from "react-router-dom";
import { UserFavorite } from "../entities/UserFavorite";
import { Id, toast } from "react-toastify";
import { useRef } from "react";
import { UserFavoritePost } from "../entities/UserFavoritePost";

const userFavoriteUploadClient = new UserAPIClient<
  UserFavoritePost,
  UserFavorite
>("favorite");

const useUserFavoritePost = () => {
  const queryClient = useQueryClient(); // Get the query client to invalid query
  const navigate = useNavigate(); // Initialize navigate
  const toastIdRef = useRef<Id | null>(null); // Use a ref to store the toast ID or the value will be lost

  return useMutation<UserFavorite, AxiosError, UserFavoritePost>({
    mutationFn: (userFavoritePost: UserFavoritePost) => {
      toastIdRef.current = toast.loading("adding...");
      return userFavoriteUploadClient.post(
        // for new anime list
        userFavoritePost
      );
    },
    onSuccess: (data: UserFavorite) => {
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
          if (!oldFavorites) return [data];
          return [...oldFavorites, data];
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
      navigate("/login");
    },
  });
};

export default useUserFavoritePost;
