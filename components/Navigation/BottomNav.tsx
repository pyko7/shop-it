import { useState } from "react";
import { Box } from "@mui/material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";

const BottomNav = () => {
  const [active, setActive] = useState(false);
  return (
    <>
      <BottomNavigation
        component="nav"
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 60,
          zIndex: 100,
          boxShadow: 0,
          bgcolor: "neutral.light",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              paddingBottom: 2,
              borderBottom: active ? 4 : 0,
              borderColor: "primary.main",
            }}
          >
            <BottomNavigationAction
              sx={{ width: "30px", height: "30px", padding: 0 }}
              aria-label="home"
              icon={
                <HomeIcon
                  sx={{
                    width: 1,
                    height: 1,
                    color: active ? "primary.main" : "default",
                  }}
                />
              }
            />
          </Box>
          <Box
            sx={{
              paddingBottom: 2,
              borderBottom: active ? 4 : 0,
              borderColor: "primary.main",
            }}
          >
            <BottomNavigationAction
              sx={{ width: "30px", height: "30px", padding: 0 }}
              aria-label="home"
              icon={
                <SearchIcon
                  sx={{
                    width: 1,
                    height: 1,
                    color: active ? "primary.main" : "default",
                  }}
                />
              }
            />
          </Box>

          <Box
            sx={{
              paddingBottom: 2,
              borderBottom: active ? 4 : 0,
              borderColor: "primary.main",
            }}
          >
            <BottomNavigationAction
              sx={{ width: "30px", height: "30px", padding: 0 }}
              aria-label="home"
              icon={
                <FavoriteIcon
                  sx={{
                    width: 1,
                    height: 1,
                    color: active ? "primary.main" : "default",
                  }}
                />
              }
            />
          </Box>

          <Box
            sx={{
              paddingBottom: 2,
              borderBottom: active ? 4 : 0,
              borderColor: "primary.main",
            }}
          >
            <BottomNavigationAction
              sx={{ width: "30px", height: "30px", padding: 0 }}
              aria-label="home"
              icon={
                <PersonIcon
                  sx={{
                    width: 1,
                    height: 1,
                    color: active ? "primary.main" : "default",
                  }}
                />
              }
            />
          </Box>
        </Box>
      </BottomNavigation>
    </>
  );
};

export default BottomNav;
