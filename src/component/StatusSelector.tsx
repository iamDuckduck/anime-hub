import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useAnimeQueryStore from "../store";

//refactor needed here?
const statusList: string[] = ["airing", "complete", "upcoming"];

const PlatformSelector = () => {
  const status = useAnimeQueryStore((s) => s.animeQuery.status);
  const setSelectedStatus = useAnimeQueryStore((s) => s.setStatus);
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown></BsChevronDown>}>
        {status || "status"}
      </MenuButton>
      <MenuList>
        {statusList.map((s) => (
          <MenuItem onClick={() => setSelectedStatus(s)} key={s}>
            {s}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PlatformSelector;
