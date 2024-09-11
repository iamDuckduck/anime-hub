import {
  Box,
  HStack,
  Menu,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";
import { useIsLoggedInStore } from "../store";

const UserProfilePage = () => {
  const isLoggedIn = useIsLoggedInStore((s) => s.isLoggedIn);
  if (isLoggedIn)
    return (
      <Box>
        <Link to="/" onClick={() => localStorage.removeItem("token")}>
          Logout
        </Link>

        <Tabs>
          <TabList>
            <Tab>My animeList</Tab>
            <Tab>Favorite</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    );

  return <Link to="/login">You should login first, click here to login</Link>;
};

export default UserProfilePage;
