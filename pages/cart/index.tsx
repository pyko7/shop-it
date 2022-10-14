import type { NextPage } from "next";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ScrollToTopButton from "../../components/Navigation/ScrollToTopButton";
import CartList from "../../components/Lists/CartList";

const Cart: NextPage = () => {
  const theme = useTheme();
  const isBiggerThanTablet = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Box
        component="section"
        sx={{
          width: "100%",
          maxWidth: 1500,
          padding: 2.5,
          marginTop: isBiggerThanTablet ? 6 : 0,
          marginX: "auto",
          backgroundColor: "neutral.light",
          borderRadius: 1,
        }}
      >
        <CartList />
      </Box>
      <ScrollToTopButton />
    </>
  );
};

export default Cart;
