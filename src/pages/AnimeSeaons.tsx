import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import useAnimeSeasonList from "../hooks/useAnimeSeasonList";
import { useState } from "react";

const AnimeSeaons = () => {
  const { data: seasons, isLoading, error } = useAnimeSeasonList();
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(0);

  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {year == 0 ? currentYear : year}
        </MenuButton>
        <MenuList maxHeight="200px" overflowY="scroll">
          {seasons?.data.map((s) => (
            <MenuItem key={s.year} onClick={() => setYear(s.year)}>
              {s.year}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <Tabs paddingY={5}>
        <TabList>
          <Tab>Spring</Tab>
          <Tab>Summer</Tab>
          <Tab>Fall</Tab>
          <Tab>Winter</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default AnimeSeaons;
