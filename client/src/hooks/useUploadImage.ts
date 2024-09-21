import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import APIClient from "../services/userService";

const imageUploadClient = new APIClient<FormData, string>("imageUpload");

const useUploadImage = () => {
  return useMutation<string, AxiosError, FormData>({
    mutationFn: (formData: FormData) => {
      return imageUploadClient.post(formData, {
        "Content-Type": "multipart/form-data",
      });
    },
    onSuccess: (imageURL: string) => {
      console.log(imageURL);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};

export default useUploadImage;
