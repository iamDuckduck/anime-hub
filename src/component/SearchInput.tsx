import { Box, Input } from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import debounce from "../hooks/useDebounce";
import useAnimeQueryStore, { useSearchBarAnimeStore } from "../store";
import SearchDropDown from "./SearchDropDown";

const SearchInput = () => {
  const setSearchText = useAnimeQueryStore((s) => s.setSearchText);
  const setSearchBarText = useSearchBarAnimeStore((s) => s.setSearchText);

  const ref = useRef<HTMLInputElement>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isRootRoute = location.pathname === "/";

  // const debounceSearch = useCallback(
  //   debounce((value: string) => {
  //     setSearchBarText(value);
  //   }, 1000),
  //   []
  // );

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!isRootRoute) navigate("/");
          if (ref.current) setSearchText(ref.current.value);
        }}
      >
        <Box position="relative">
          <Input
            ref={ref}
            borderRadius={isInputFocused ? "20px 20px 0 0" : 20}
            placeholder="Search games..."
            variant="unstyled"
            padding={2}
            backgroundColor="#3b3b3b"
            onFocus={() => setIsInputFocused(!isInputFocused)}
            onBlur={() => setIsInputFocused(!isInputFocused)}
            onChange={() => {
              setSearchBarText(ref.current?.value ? ref.current?.value : "");
            }}
          ></Input>

          {isInputFocused && <SearchDropDown></SearchDropDown>}
        </Box>
      </form>
    </>
  );
};

export default SearchInput;
