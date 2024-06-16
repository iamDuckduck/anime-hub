import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
const PlatformSelector = () => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown></BsChevronDown>}>
        Status
        <MenuList>
          <MenuItem>airing</MenuItem>
          <MenuItem>complete</MenuItem>
          <MenuItem>upcoming</MenuItem>
        </MenuList>
      </MenuButton>
    </Menu>
  );
};

export default PlatformSelector;
