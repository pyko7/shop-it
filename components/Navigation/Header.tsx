import Link from "next/link";
import { styled } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Searchbar from "./Searchbar";

const Header = () => {
  const theme = useTheme();
  const isBiggerThanMobile = useMediaQuery(theme.breakpoints.up("sm"));

  const HeaderIcons = styled(IconButton)(({ theme }) => ({
    "&:hover": {
      color: theme.palette.primary.main,
      background: "transparent",
    },
  }));

  return (
    <Box
      sx={{
        width: "100%",
        height: "50px",
      }}
    >
      <AppBar
        sx={{
          width: "100%",
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
        <Link href="/">
          <a style={{ width: "50%", textDecoration: "none", color: "inherit" }}>
            <Typography
              sx={{ fontSize: isBiggerThanMobile ? 24 : 20, fontWeight: 500 }}
            >
              Shop-it!
            </Typography>
          </a>
        </Link>

        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          {isBiggerThanMobile ? <Searchbar /> : null}

          {isBiggerThanMobile ? (
            <Link href="/favorites">
              <a
                style={{
                  width: "fit-content",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <HeaderIcons
                  size="large"
                  sx={{ fontSize: isBiggerThanMobile ? 28 : null }}
                  aria-label="favorite page"
                >
                  <FavoriteIcon fontSize="inherit" />
                </HeaderIcons>
              </a>
            </Link>
          ) : null}

          <HeaderIcons
            size="large"
            sx={{ fontSize: isBiggerThanMobile ? 28 : null }}
            aria-label="user cart"
          >
            <ShoppingCartIcon fontSize="inherit" />
          </HeaderIcons>

          {isBiggerThanMobile ? (
            <HeaderIcons
              size="large"
              sx={{ fontSize: 32 }}
              aria-label="profile page"
            >
              <PersonIcon fontSize="inherit" />
            </HeaderIcons>
          ) : null}
        </Box>
      </AppBar>
    </Box>
  );
};

export default Header;
