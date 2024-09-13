import React, { useState } from "react";
import {
  Button,
  Image,
  Input,
  Spinner,
  Flex,
  Heading,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import useUploadImage from "../hooks/useUploadImage";

const ImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  const uploadImage = useUploadImage(setImageUrl);
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Show preview of selected image
    }
  };

  // Handle form submission
  // Handle file upload
  const handleSubmit = async () => {
    if (!file || !token) return;

    const formData = new FormData();
    formData.append("image", file);

    uploadImage.mutate({
      imageFile: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "x-auth-token": token,
      },
    });
  };

  return (
    <>
      {uploadImage.error && (
        <Alert status="error" marginBottom={10}>
          <AlertIcon />
          {uploadImage.error.message}
        </Alert>
      )}
      <Flex
        flexDirection="column"
        outline="2px solid grey"
        padding={2}
        borderRadius={2}
      >
        <Heading>Avatar</Heading>
        <Flex marginTop={5} alignSelf="center">
          <Flex
            height="200px"
            width="200px"
            position="relative"
            alignItems="center"
            justifyContent="center"
            flexBasis="auto"
            outline="2px dashed grey"
          >
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              width="100%"
              height="100%"
              position="absolute"
              cursor="pointer"
            />
            <p>click here to upload</p>
          </Flex>

          {preview && (
            <Image
              marginLeft={10}
              src={preview}
              alt="Image Preview"
              boxSize="200px"
            />
          )}
        </Flex>

        <Button
          margin={5}
          colorScheme="blue"
          onClick={handleSubmit}
          isDisabled={!file}
        >
          {uploadImage.isLoading ? <Spinner size="sm" /> : "Upload Image"}
        </Button>
      </Flex>
    </>
  );
};

export default ImageUpload;
