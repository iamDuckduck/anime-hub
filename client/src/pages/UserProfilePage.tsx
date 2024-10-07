import {
  Box,
  Button,
  Image,
  SimpleGrid,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router-dom";
import ImageUpload from "../component/ImageUpload";
import useLogout from "../hooks/useLogout";
import { useIsLoggedInStore } from "../store";
import useAnimeLists from "../hooks/useAnimeLists";
import AnimeCardContainer from "../component/AnimeCard/AnimeCardContainer";
import AnimeCardInProfile from "../component/AnimeCard/AnimeCardInProfile";
import useFavorite from "../hooks/useUserFavorite";
import UserProfileLists from "../component/ProfileAnimeListsGrid";
import { useEffect } from "react";
import { toast } from "react-toastify";

const UserProfilePage = () => {
  const { data: animeLists, isLoading: isAnimeListLoading } = useAnimeLists();
  const { data: userFavorites, isLoading: isFavoriteLoading } = useFavorite(); // only fetch when logged in
  const userData = useIsLoggedInStore((s) => s.userData); // get user data

  const {
    mutate,
    isLoading: logoutIsLoading,
    error: logoutError,
  } = useLogout();

  const isLoggedIn = useIsLoggedInStore((s) => s.isLoggedIn);

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (logoutError) return <p>logout error</p>;

  return (
    <Box>
      <Box
        position="relative"
        backgroundImage={`url(${userData.bannerImage})`}
        backgroundRepeat="no-repeat"
        backgroundSize="cover" // Use cover to fill the whole box
        backgroundPosition="center" // Center the image
        height="300px"
        width="100%"
      >
        <Image
          position="absolute"
          bottom={0}
          left={120}
          boxSize="150px"
          src={userData.profileImage}
        ></Image>
      </Box>

      <Tabs isFitted>
        <TabList>
          <Tab>My animeList</Tab>
          <Tab>Favorite</Tab>
          <Tab>Setting</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {isAnimeListLoading ? (
              <Spinner></Spinner>
            ) : (
              <UserProfileLists animeLists={animeLists}></UserProfileLists>
            )}
          </TabPanel>
          <TabPanel>
            <SimpleGrid
              padding="10px"
              columns={{ sm: 1, md: 3, lg: 5, xl: 7 }}
              spacing={6}
            >
              {!isFavoriteLoading &&
                userFavorites?.map((userFavorite) => {
                  if (userFavorite.favorite) {
                    return (
                      <AnimeCardContainer key={userFavorite._id}>
                        <AnimeCardInProfile userFavorite={userFavorite} />
                      </AnimeCardContainer>
                    );
                  }
                  return null; // Return null if userFavorite.favorite is false
                })}
            </SimpleGrid>
          </TabPanel>

          <TabPanel>
            <ImageUpload
              imageCategory="profileImage"
              imageTitle="Avatar"
              dimensions={{ width: 200, height: 200 }}
            ></ImageUpload>
            <ImageUpload
              imageCategory="bannerImage"
              imageTitle="Banner"
              dimensions={{ width: 400, height: 300 }}
            ></ImageUpload>

            <Button isDisabled={logoutIsLoading} onClick={() => mutate()}>
              Logout
            </Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default UserProfilePage;
