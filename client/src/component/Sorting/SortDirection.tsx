import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import useAnimeQueryStore from "../../store";
const SortDirection = () => {
  const setSortDirection = useAnimeQueryStore((s) => s.setSortDirection);
  const sortDirection = useAnimeQueryStore((s) => s.animeQuery.sortDirection);

  const toggleDirection = () =>
    setSortDirection(sortDirection === "desc" ? "asc" : "desc");

  const renderSortIcon = () => {
    if (!sortDirection) {
      return <MinusIcon />;
    } else if (sortDirection === "desc") {
      return <ArrowDownIcon />;
    } else {
      return <ArrowUpIcon />;
    }
  };
  return (
    <>
      <Button onClick={toggleDirection}>{renderSortIcon()}</Button>
    </>
  );
};

export default SortDirection;
