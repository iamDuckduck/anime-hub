import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import ImageAPIClient, { CloudinaryRes } from "../services/imageUpload";
import UserAPIClient from "../services/userService";

const imageUploadClient = new ImageAPIClient<FormData, CloudinaryRes>(
  "imageUpload"
);
const saveImageClient = new UserAPIClient<object, string>("users");

const useUploadImage = (imageCategory: string) => {
  const queryClient = useQueryClient();
  return useMutation<CloudinaryRes, AxiosError, FormData>({
    mutationFn: (formData: FormData) => {
      return imageUploadClient.post(formData);
    },
    onSuccess: async (imageURL: CloudinaryRes) => {
      await saveImageClient
        .put({ [imageCategory]: imageURL.imageUrl })
        .then((res) => res)
        .catch(() => {
          throw new AxiosError("Failed to save image URL to user data");
        });
      //auto refresh
      queryClient.invalidateQueries(["userInfo"]);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};

export default useUploadImage;
