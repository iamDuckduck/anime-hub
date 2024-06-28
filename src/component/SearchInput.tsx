import { Box, Input } from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import debounce from "../hooks/useDebounce";
import useAnimeQueryStore, { useSearchBarAnimeStore } from "../store";
import SearchDropDown from "./SearchDropDown";

const SearchInput = () => {
  // setSearchText is for the searching for entire page
  const setSearchText = useAnimeQueryStore((s) => s.setSearchText);

  // for searching of dropdown box
  const setSearchBarText = useSearchBarAnimeStore((s) => s.setSearchText);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const ref = useRef<HTMLInputElement>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isRootRoute = location.pathname === "/";

  const handleInputFocus = () => {
    if (ref.current?.value) setIsDropdownOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isRootRoute) navigate("/");
    if (ref.current) setSearchText(ref.current.value);
  };

  // delay searching
  const debounceSearch = useCallback(
    debounce((value: string) => {
      setSearchBarText(value);
    }, 400),
    []
  );

  const handleOnChnage = () => {
    if (ref.current?.value !== "" && ref.current?.value) {
      debounceSearch(ref.current?.value);
      setIsDropdownOpen(true);
    } else setIsDropdownOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box position="relative">
          <Input
            ref={ref}
            borderRadius={20}
            placeholder="Search games..."
            variant="filled"
            padding={2}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={handleOnChnage}
          ></Input>

          {ref.current?.value && isDropdownOpen && (
            <SearchDropDown></SearchDropDown>
          )}
        </Box>
      </form>
    </>
  );
};

export default SearchInput;

// const handleDocumentClick = (event: MouseEvent) => {
//   // Close dropdown if clicked outside of SearchInput or SearchDropDown
//   if (ref.current && !ref.current.contains(event.target as Node)) {
//     setIsDropdownOpen(false);
//   }
// };

// useEffect(() => {
//   document.addEventListener("click", handleDocumentClick);

//   return () => {
//     document.removeEventListener("click", handleDocumentClick);
//   };
// }, []);
