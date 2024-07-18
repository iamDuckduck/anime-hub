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
import { BsChevronDown } from "react-icons/bs";
import { useAnimeSeasonSortOrderStore } from "../store";

const AnimeSeasons = () => {
  // get a list of years
  const { data: AnimeSeasonList, error } = useAnimeSeasonList();

  const sortOrder = useAnimeSeasonSortOrderStore((s) => s.sortOrder);
  const setOrder = useAnimeSeasonSortOrderStore((s) => s.setOrder);

  const sortOrders = ["Relevance", "Rank", "Score"];

  if (error) return error;

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

      <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronDown></BsChevronDown>}>
          Order by: {sortOrder || "Relevance"}
        </MenuButton>
        <MenuList>
          {sortOrders.map((order) => (
            <MenuItem onClick={() => setOrder(order)} key={order} value={order}>
              {order}
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

export default AnimeSeasons;
