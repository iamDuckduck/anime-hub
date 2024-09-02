import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useAnimeQueryStore from "../../store";
import { SortFilter } from "./SortFilter";

const statusList: string[] = ["Airing", "Complete", "Upcoming"];

const PlatformSelector = () => {
  const status = useAnimeQueryStore((s) => s.animeQuery.status);
  const setSelectedStatus = useAnimeQueryStore((s) => s.setStatus);
  return (
    <SortFilter optionList={statusList} setFilter={setSelectedStatus}>
      {status || "Status"}
    </SortFilter>
  );
};

export default PlatformSelector;
