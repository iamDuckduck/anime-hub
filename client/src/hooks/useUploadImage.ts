import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import APIClient from "../services/userService";
interface UploadImagePost {
  imageFile: FormData;
  headers: Record<string, string>;
}
const imageUploadClient = new APIClient<FormData, string>("imageUpload");

const useUploadImage = (
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>
) => {
  return useMutation<string, AxiosError, UploadImagePost>({
    mutationFn: (uploadImagePost: UploadImagePost) => {
      return imageUploadClient.post(
        uploadImagePost.imageFile,
        uploadImagePost.headers
      );
    },
    onSuccess: (imageURL: string) => {
      console.log(imageURL);
      setImageUrl(imageURL);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};

export default useUploadImage;
