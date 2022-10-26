import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ScrollToTopButton from "~/components/Navigation/ScrollToTopButton";
//avoid hydration error - solution found here: https://github.com/vercel/next.js/discussions/35773#discussioncomment-2840696
const CartList = dynamic(() => import("~/components/Lists/CartList"), {
  ssr: false,
});

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
