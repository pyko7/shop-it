import { useState } from "react";
import { useRouter } from "next/router";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BottomNavigation from "@mui/material/BottomNavigation";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";

const BottomNav = () => {
  const { pathname } = useRouter();
  const [value, setValue] = useState(pathname);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box sx={{ position: "sticky", bottom: 0, width: 1, zIndex: 100 }}>
      {matches ? null : (
        <BottomNavigation
          sx={{ width: 1 }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
        >
          <BottomNavigationAction
            aria-label="Home"
            label="Home"
            icon={<HomeIcon />}
            value="/"
            component={Link}
            href="/"
          />
          <BottomNavigationAction
            aria-label="Search"
            label="Search"
            icon={<SearchIcon />}
            value="/search"
            component={Link}
            href="/search"
          />
          <BottomNavigationAction
            aria-label="Favorites"
            label="Favorites"
            icon={<FavoriteIcon />}
            value="/favorites"
            component={Link}
            href="/favorites"
          />
          <BottomNavigationAction
            aria-label="Profile"
            label="Profile"
            icon={<PersonIcon />}
            value="/profile"
            component={Link}
            href="/profile"
          />
        </BottomNavigation>
      )}
    </Box>
  );
};

export default BottomNav;
