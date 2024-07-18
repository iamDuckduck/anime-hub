import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
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
import { useAnimeSeasonSortOrderStore } from "../store";
import { SortFilter } from "../component/Sorting/SortFilter";

const AnimeSeasons = () => {
  // get a list of years
  const { data: AnimeSeasonList, error } = useAnimeSeasonList();

  const sortOrder = useAnimeSeasonSortOrderStore((s) => s.sortOrder);
  const setOrder = useAnimeSeasonSortOrderStore((s) => s.setOrder);

  const sortOrders = ["Relevance", "Rank", "Score"];

  const [typeFilter, setTypeFilter] = useState("tv");
  const typeFilters = ["tv", "movie", "ova", "special", "ona", "music"];

  if (error) return error;

  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  // 0 = Spring, 1 = Summer ...
  const [tabIndex, setTabIndex] = useState(0);
  const seasons = ["Spring", "Summer", "Fall", "Winter"];

  return (
    <>
      <HStack wrap="wrap">
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

        <SortFilter optionList={sortOrders} setFilter={setOrder}>
          {"Order by: " + (sortOrder || "Relevance")}
        </SortFilter>

        <SortFilter optionList={typeFilters} setFilter={setTypeFilter}>
          {"Type: " + typeFilter}
        </SortFilter>
      </HStack>

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

export default AnimeSeasons;
