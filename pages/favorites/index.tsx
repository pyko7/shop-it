import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ScrollToTopButton from "~/components/Navigation/ScrollToTopButton";
//avoid hydration error - solution found here: https://github.com/vercel/next.js/discussions/35773#discussioncomment-2840696
const FavoriteList = dynamic(() => import("~/components/Lists/FavoriteList"), {
  ssr: false,
});

const Favorites: NextPage = () => {
  const theme = useTheme();
  const isBiggerThanTablet = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Head>
        <title>Favorites | Shop-it!</title>
        <meta name="description" content="Find your favorite articles" />
        {/* Open Graph */}
        <meta property="og:title" content="Favorites | Shop-it!" />
        <meta property="og:description" content="Find your favorite articles" />
      </Head>
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
        <FavoriteList />
      </Box>
      <ScrollToTopButton />
    </>
  );
};

export default Favorites;
