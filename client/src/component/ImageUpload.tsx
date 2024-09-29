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
  Box,
} from "@chakra-ui/react";
import useUploadImage from "../hooks/useUploadImage";
import Cropper, { Area, Point } from "react-easy-crop";
import getCroppedImg, {
  blobUrlToBlob,
  PixelCrop,
  readFile,
} from "../function/getCroppedImg";

interface ImageUploadProps {
  imageCategory: "profileImage" | "bannerImage";
  imageTitle: string;
  dimensions: { width: number; height: number };
}

const ImageUpload = ({
  imageCategory,
  imageTitle,
  dimensions,
}: ImageUploadProps) => {
  const { error, isLoading, mutate } = useUploadImage(imageCategory); // hook for uploading image to cloudinary

  const [imageSrc, setImageSrc] = useState<any>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop>(
    {} as PixelCrop
  );

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // Handle file selection, and preview uploaded image
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    let imageDataUrl = await readFile(selectedFile);
    setImageSrc(imageDataUrl);
  };

  // Handle file upload
  const handleSubmit = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (!croppedImage) return;

      // Convert Blob URL to actual Blob
      const imageBlob = await blobUrlToBlob(croppedImage);

      const formData = new FormData();
      formData.append("image", imageBlob, `${imageCategory}.jpg`); // Append the Blob to FormData

      mutate(formData); // Upload using your mutation
    } catch (e) {
      console.error(e);
    }
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

          {imageSrc && (
            <Box
              ml={20}
              position="relative"
              height={dimensions.height + "px"}
              width={dimensions.width + "px"}
            >
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={imageCategory == "bannerImage" ? 12 / 3 : 1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </Box>

            // <Image
            //   marginLeft={10}
            //   src={preview}
            //   alt="Image Preview"
            //   height={dimensions.height}
            //   width={dimensions.width}
            // />
          )}
        </Flex>

        <Button
          margin={5}
          colorScheme="blue"
          onClick={handleSubmit}
          isDisabled={!imageSrc}
        >
          {isLoading ? <Spinner size="sm" /> : "Upload Image"}
        </Button>
      </Flex>
    </>
  );
};

export default ImageUpload;
