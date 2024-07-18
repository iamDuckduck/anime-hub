import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useAnimeQueryStore from "../../store";
import { SortFilter } from "./SortFilter";

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

  // find the corresponding label of sortOrder
  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  );

  return (
    <SortFilter optionObject={sortOrders} setFilter={setSortOrder}>
      {"Order by: " + (currentSortOrder?.label || "Relevance")}
    </SortFilter>
  );
};

export default SortSelector;
