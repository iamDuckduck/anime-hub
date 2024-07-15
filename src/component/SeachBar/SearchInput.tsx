import { Box, Input } from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import debounce from "../../hooks/useDebounce";
import useAnimeQueryStore, { useSearchBarAnimeStore } from "../../store";
import SearchDropDown from "./SearchDropDown";

const SearchInput = () => {
  // for entire page searching
  const setSearchText = useAnimeQueryStore((s) => s.setSearchText);

  // for dropdown box searching
  const setSearchBarText = useSearchBarAnimeStore((s) => s.setSearchText);

  // control dropdown box  manually
  const [isDropdownClicked, setIsDropdownClicked] = useState(false);

  // for re-rendering when inputbar value changes
  const [inputBoxValue, setInputBoxValue] = useState("");

  // search bar value
  const ref = useRef<HTMLInputElement>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isRootRoute = location.pathname === "/";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isRootRoute) navigate("/");
    if (ref.current) setSearchText(ref.current.value);
    handleInputBlur();
  };

  // logic for dropdown box searching
  const handleInputFocus = () => {
    setIsDropdownClicked(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsDropdownClicked(false);
    }, 150);
  };

  // delay dropdown box searching ()
  const debounceSearch = useCallback(
    debounce((value: string) => {
      setSearchBarText(value);
    }, 400),
    []
  );

  const handleOnChnage = () => {
    if (ref.current?.value) {
      debounceSearch(ref.current?.value);
    }

    // ensure ref.current?.value is a string and re render when value changed
    if (ref.current?.value !== undefined) setInputBoxValue(ref.current?.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box position="relative">
          <Input
            ref={ref}
            borderRadius={20}
            placeholder="Search Anime..."
            variant="filled"
            padding={3}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={handleOnChnage}
          ></Input>

          {ref.current?.value && isDropdownClicked && (
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
