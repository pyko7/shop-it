import { styled } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

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
    <Box
      sx={{
        width: "100%",
        height: "50px",
      }}
    >
      <AppBar
        sx={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 1920,
          height: "70px",
          paddingX: 3,
          bgcolor: "neutral.light",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: 0,
        }}
      >
        <Box sx={{ width: "50%" }}>
          <Typography sx={{ fontSize: matches ? 24 : 20, fontWeight: 500 }}>
            Shop-it!
          </Typography>
        </Box>

        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          {matches ? (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <SearchInput />
            </Search>
          ) : null}
          <IconButton
            size="large"
            sx={{ fontSize: matches ? 28 : null }}
            aria-label="user cart"
          >
            <ShoppingCartIcon fontSize="inherit" />
          </IconButton>

          {matches ? (
            <IconButton
              size="large"
              sx={{ fontSize: 32 }}
              aria-label="user cart"
            >
              <PersonIcon fontSize="inherit" />
            </IconButton>
          ) : null}
        </Box>
      </AppBar>
    </Box>
  );
};

export default Header;
