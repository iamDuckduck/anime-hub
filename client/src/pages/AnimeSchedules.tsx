import { useEffect, useState } from "react";
import AnimeSchedule from "../component/AnimeSchedule";
import { useSearchScheduleStore } from "../store";
import {
  Button,
  Checkbox,
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
import year from "react-datepicker/dist/year";
import AnimeSeason from "../component/AnimeSeason";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { setYear } from "react-datepicker/dist/date_utils";

const AnimeSchedules = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [tabIndex, setTabIndex] = useState(0);

  const kidContent = useSearchScheduleStore((s) => s.kidContent);
  const setKidContent = useSearchScheduleStore((s) => s.setKidContent);

  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {kidContent ? "Only Kids Content" : "Exclude Kids Content"}
        </MenuButton>
        <MenuList maxHeight="200px" overflowY="scroll">
          <MenuItem onClick={() => setKidContent(false)}>
            Exclude Kids Content
          </MenuItem>
          <MenuItem onClick={() => setKidContent(true)}>
            Only Kids Content
          </MenuItem>
        </MenuList>
      </Menu>

      <Tabs paddingY={5} onChange={(index) => setTabIndex(index)}>
        <TabList display="flex" flexWrap="wrap">
          {days.map((s) => (
            <Tab key={s}>{s}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {days.map((d, i) => (
            <TabPanel paddingX={0} key={i}>
              {tabIndex == i && <AnimeSchedule day={d}></AnimeSchedule>}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
};

export default AnimeSchedules;
