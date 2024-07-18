import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useAnimeQueryStore from "../../store";

interface optionObject {
  value: string;
  label: string;
}
interface Props {
  optionList?: string[];
  optionObject?: optionObject[];
  setFilter: (sortOrder: string) => void;
  children: React.ReactNode;
}
export const SortFilter = ({
  optionList,
  optionObject,
  setFilter,
  children,
}: Props) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown></BsChevronDown>}>
        {children}
      </MenuButton>

      {optionList && (
        <MenuList>
          {optionList?.map((order) => (
            <MenuItem
              onClick={() => setFilter(order)}
              key={order}
              value={order}
            >
              {order}
            </MenuItem>
          ))}
        </MenuList>
      )}

      {optionObject && (
        <MenuList>
          {optionObject?.map((order) => (
            <MenuItem
              onClick={() => setFilter(order.value)}
              key={order.label}
              value={order.label}
            >
              {order.label}
            </MenuItem>
          ))}
        </MenuList>
      )}
    </Menu>
  );
};
