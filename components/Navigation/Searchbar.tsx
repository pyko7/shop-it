import { styled } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Searchbar = () => {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    width: "33%",
    minWidth: "250px",
    height: "40px",
    padding: "0 10px 0 10px",
    marginRight: "20px",
    display: "flex",
    gap: "2px",
    borderRadius: "4px",
    backgroundColor: theme.palette.neutral?.main,
  }));

  const SearchIconWrapper = styled("div")({
    width: "fit-content",
    height: "100%",
    display: "flex",
    alignItems: "center",
  });

  const SearchInput = styled(InputBase)({
    width: "100%",
    height: "100%",
    paddingLeft: "6px",
    borderTopRightRadius: "4px",
    borderBottomRightRadius: "4px",
  });
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <SearchInput />
    </Search>
  );
};

export default Searchbar;
