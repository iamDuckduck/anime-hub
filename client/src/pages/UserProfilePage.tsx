import {
  Box,
  Button,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";
import ImageUpload from "../component/ImageUpload";
import useGetUser from "../hooks/useGetUser";
import useLogout from "../hooks/useLogout";

const UserProfilePage = () => {
  const { isLoading: authIsLoading, error: authError } = useGetUser(); // it returns error if user not auth

  const navigate = useNavigate(); // Initialize navigate

  const {
    mutate,
    isLoading: logoutIsLoading,
    error: logoutError,
  } = useLogout(navigate);

  if (authIsLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (authError) return <Navigate to="/login" replace />;
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
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <ImageUpload
              fileType="profileImg"
              title="Avatar"
              imageSize={{ width: "200px", height: "200px" }}
            ></ImageUpload>
            <ImageUpload
              fileType="bannerImg"
              title="Banner"
              imageSize={{ width: "500px", height: "300px" }}
            ></ImageUpload>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default UserProfilePage;
