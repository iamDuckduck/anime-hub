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
import { useState } from "react";
import useAnimeSeasonList from "../hooks/useAnimeSeasonList";
import AnimeSeason from "../component/AnimeSeason";

const AnimeSeaons = () => {
  // a list of years
  const { data: AnimeSeasonList, isLoading, error } = useAnimeSeasonList();

  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const [tabIndex, setTabIndex] = useState(0);

  const seasons = ["Spring", "Summer", "Fall", "Winter"];
  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {year}
        </MenuButton>
        <MenuList maxHeight="200px" overflowY="scroll">
          {AnimeSeasonList?.data.map((s) => (
            <MenuItem key={s.year} onClick={() => setYear(s.year)}>
              {s.year}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <Tabs paddingY={5} onChange={(index) => setTabIndex(index)}>
        <TabList>
          {seasons.map((s) => (
            <Tab key={s}>{s}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {seasons.map((s, i) => (
            <TabPanel key={i}>
              {tabIndex == i && (
                <AnimeSeason year={year.toString()} season={s}></AnimeSeason>
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
};

export default AnimeSeaons;
