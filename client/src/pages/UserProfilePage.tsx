import {
  Box,
  Button,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";
import ImageUpload from "../component/ImageUpload";
import useLogout from "../hooks/useLogout";
import { useIsLoggedInStore } from "../store";
import useAnimeList from "../hooks/useAnimeList";
import AnimeCardContainer from "../component/AnimeCard/AnimeCardContainer";
import AnimeCardInProfile from "../component/AnimeCard/AnimeCardInProfile";
import useFavorite from "../hooks/useUserFavorite";

const UserProfilePage = () => {
  const isLoggedIn = useIsLoggedInStore((s) => s.isLoggedIn);
  const navigate = useNavigate(); // Initialize navigate
  const { data: animeLists, isLoading: isAnimeListLoading } = useAnimeList();
  const { data: userFavorites, isLoading: isFavoriteLoading } = useFavorite(); // only fetch when logged in

  const {
    mutate,
    isLoading: logoutIsLoading,
    error: logoutError,
  } = useLogout(navigate);

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (logoutError) return <p>logout error</p>;

  return (
    <Box>
      <Button isDisabled={logoutIsLoading} onClick={() => mutate()}>
        Logout
      </Button>

      <Tabs>
        <TabList>
          <Tab>My animeList</Tab>
          <Tab>Favorite</Tab>
          <Tab>Setting</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <SimpleGrid
              padding="10px"
              columns={{ sm: 1, md: 3, lg: 5, xl: 7 }}
              spacing={6}
            >
              {!isFavoriteLoading &&
                userFavorites?.map((userFavorite) => (
                  <AnimeCardContainer key={userFavorite._id}>
                    <AnimeCardInProfile userFavorite={userFavorite} />
                  </AnimeCardContainer>
                ))}
            </SimpleGrid>
          </TabPanel>

          <TabPanel>
            <ImageUpload
              imageCategory="profileImage"
              imageTitle="Avatar"
              dimensions={{ width: "200px", height: "200px" }}
            ></ImageUpload>
            <ImageUpload
              imageCategory="bannerImage"
              imageTitle="Banner"
              dimensions={{ width: "500px", height: "300px" }}
            ></ImageUpload>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default UserProfilePage;
