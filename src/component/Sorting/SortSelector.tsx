import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useAnimeQueryStore from "../../store";

const SortSelector = () => {
  const sortOrder = useAnimeQueryStore((s) => s.animeQuery.sortOrder);
  const setSortOrder = useAnimeQueryStore((s) => s.setSortorder);

  const sortOrders = [
    { value: "", label: "Relevance" },
    { value: "title", label: "Title" },
    { value: "start_date", label: "Start_date" },
    { value: "episodes", label: "Episodes" },
    { value: "score", label: "Score" },
    { value: "popularity", label: "Rank" },
    { value: "favorites", label: "Favorites" },
  ];

  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  );

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown></BsChevronDown>}>
        Order by: {currentSortOrder?.label || "Relevance"}
      </MenuButton>
      <MenuList>
        {sortOrders.map((order) => (
          <MenuItem
            onClick={() => setSortOrder(order.value)}
            key={order.value}
            value={order.value}
          >
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
