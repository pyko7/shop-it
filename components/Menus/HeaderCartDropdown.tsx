import { useRouter } from "next/router";
import { useTheme, useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCartContext } from "~/context/CartContext";
import CartDropdown from "./CartDropdown";
import { useEffect } from "react";

const HeaderCartDropdown = () => {
  const theme = useTheme();
  const { pathname } = useRouter();
  const { cartTotalQuantity, anchorEl, setAnchorEl } = useCartContext();
  const isBiggerThanMobile = useMediaQuery(theme.breakpoints.up("sm"));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (pathname === "/cart" || pathname === "/payment") {
      setAnchorEl(null);
    }
  }, [pathname]);

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        aria-label="user cart"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        size="large"
        sx={{
          fontSize: isBiggerThanMobile ? 28 : null,
          color: "rgba(0, 0, 0, 0.54)",
          "&:hover": {
            color: theme.palette.primary.main,
            background: "transparent",
          },
          "&:disabled": {
            color: "rgba(0, 0, 0, 0.54)",
          },
        }}
        disabled={pathname === "/cart" ? true : false}
        onClick={handleClick}
      >
        <Badge
          color="primary"
          invisible={cartTotalQuantity < 0 ? true : false}
          badgeContent={cartTotalQuantity}
          max={99}
        >
          <ShoppingCartIcon fontSize="inherit" />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{ height: "80%", marginLeft: -6 }}
      >
        <CartDropdown />
      </Popover>
    </>
  );
};

export default HeaderCartDropdown;
