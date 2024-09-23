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

interface ImageUploadProps {
  imageCategory: "profileImage" | "bannerImage";
  imageTitle: string;
  dimensions: { width: string; height: string };
}

const ImageUpload = ({
  imageCategory,
  imageTitle,
  dimensions,
}: ImageUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { error, isLoading, mutate } = useUploadImage(imageCategory); // hook for uploading image to cloudinary

  // Handle file selection, and preview uploaded image
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
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file, imageCategory);

    mutate(formData);
  };

  return (
    <>
      {error && (
        <Alert status="error" marginBottom={10}>
          <AlertIcon />
          {error.message}
        </Alert>
      )}
      <Flex
        flexDirection="column"
        outline="2px solid grey"
        padding={2}
        borderRadius={2}
        margin={5}
      >
        <Heading>{imageTitle}</Heading>
        <Flex marginTop={5} alignSelf="center">
          <Flex
            height={dimensions.height}
            width={dimensions.width}
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
              height={dimensions.height}
              width={dimensions.width}
            />
          )}
        </Flex>

        <Button
          margin={5}
          colorScheme="blue"
          onClick={handleSubmit}
          isDisabled={!file}
        >
          {isLoading ? <Spinner size="sm" /> : "Upload Image"}
        </Button>
      </Flex>
    </>
  );
};

export default ImageUpload;
