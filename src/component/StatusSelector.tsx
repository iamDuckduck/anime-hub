import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  onSelectStatus: (status: string) => void;
  selectedStatus: string | null;
}

//refactor needed here?
const status: string[] = ["airing", "complete", "upcoming"];

const PlatformSelector = ({ onSelectStatus, selectedStatus }: Props) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown></BsChevronDown>}>
        {selectedStatus || "status"}
      </MenuButton>
      <MenuList>
        {status.map((s) => (
          <MenuItem onClick={() => onSelectStatus(s)} key={s}>
            {s}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PlatformSelector;
