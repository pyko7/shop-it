import { AppBar, Box, Typography, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header = () => {
  return (
    <Box sx={{ width: "100%", height: "50px" }}>
      <AppBar
        sx={{
          width: "100%",
          height: "70px",
          paddingX: 4,
          bgcolor: "neutral.light",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: 0,
        }}
      >
        <Box sx={{ width: "50%" }}>
          <Typography sx={{ fontSize: 20, fontWeight: 500 }}>
            Shop-it!
          </Typography>
        </Box>

        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <IconButton aria-label="user cart">
            <ShoppingCartIcon />
          </IconButton>
        </Box>
      </AppBar>
    </Box>
  );
};

export default Header;
