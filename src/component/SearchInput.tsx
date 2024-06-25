import { Input, InputGroup } from "@chakra-ui/react";
import { useRef } from "react";
import useAnimeQueryStore from "../store";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const SearchInput = () => {
  const setSearchText = useAnimeQueryStore((s) => s.setSearchText);
  const ref = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isRootRoute = location.pathname === "/";
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!isRootRoute) navigate("/");
        if (ref.current) setSearchText(ref.current.value);
      }}
    >
      <InputGroup>
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search games..."
          variant="filled"
        ></Input>
      </InputGroup>
    </form>
  );
};

export default SearchInput;
