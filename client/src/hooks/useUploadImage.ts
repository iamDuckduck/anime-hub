import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import APIClient, { CloudinaryRes } from "../services/userService";

const imageUploadClient = new APIClient<FormData, CloudinaryRes>("imageUpload");
const saveImageClient = new APIClient<object, string>("users");

const useUploadImage = (imageCategory: string) => {
  return useMutation<CloudinaryRes, AxiosError, FormData>({
    mutationFn: (formData: FormData) => {
      return imageUploadClient.post(formData, {
        "Content-Type": "multipart/form-data",
      });
    },
    onSuccess: async (imageURL: CloudinaryRes) => {
      await saveImageClient
        .put({ [imageCategory]: imageURL.imageUrl })
        .then((res) => res)
        .catch(() => {
          throw new AxiosError("Failed to save image URL to user data");
        });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};

export default useUploadImage;
