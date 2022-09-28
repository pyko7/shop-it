import { useState } from "react";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BottomNavigation from "@mui/material/BottomNavigation";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";

const BottomNav = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      {matches ? null : (
        <BottomNavigation
          sx={{ position: "sticky", bottom: 0, width: 1 }}
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
          />
          <BottomNavigationAction
            aria-label="Search"
            label="Search"
            icon={<SearchIcon />}
          />
          <BottomNavigationAction
            aria-label="Favorites"
            label="Favorites"
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            aria-label="Profile"
            label="Profile"
            icon={<PersonIcon />}
          />
        </BottomNavigation>
      )}
    </>
  );
};

export default BottomNav;
