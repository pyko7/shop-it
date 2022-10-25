import { useTheme, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const ProfileList = () => {
  const theme = useTheme();
  const isBiggerThanMobile = useMediaQuery(theme.breakpoints.up("sm"));

  const ListButton = styled(ListItemButton)({
    padding: "10px 0",
  });

  return (
    <List
      sx={{
        maxWidth: 380,
        marginY: 0,
        marginX: isBiggerThanMobile ? 0 : "auto",
        paddingX: 1,
        paddingY: 0.5,
        border: "2px solid rgba(0,0,0,0.2)",
        borderRadius: 1,
      }}
    >
      <ListItem disablePadding>
        <ListButton divider>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="My orders" />
          <ChevronRightIcon />
        </ListButton>
      </ListItem>
      <ListItem disablePadding>
        <ListButton divider>
          <ListItemIcon>
            <ShoppingCartCheckoutIcon />
          </ListItemIcon>
          <ListItemText primary="My returns" />
          <ChevronRightIcon />
        </ListButton>
      </ListItem>
      <ListItem disablePadding>
        <ListButton>
          <ListItemIcon>
            <PermIdentityIcon />
          </ListItemIcon>
          <ListItemText primary="My details" />
          <ChevronRightIcon />
        </ListButton>
      </ListItem>
    </List>
  );
};

export default ProfileList;
