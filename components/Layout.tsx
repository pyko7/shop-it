import Box from "@mui/material/Box";
import Head from "next/head";
import { ReactNode } from "react";
import BottomNav from "./Navigation/BottomNav";
import Header from "./Navigation/Header";

const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <Head>
        <title>Shop-it!</title>
        <meta
          name="description"
          content="On Shop-it! you can find everything you want"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Shop-it!" />
        <meta
          property="og:description"
          content="On Shop-it! you can find everything you want"
        />
      </Head>

      <Header />

      <Box
        component="main"
        sx={{
          width: "100%",
          minHeight: "100vh",
          marginY: 0,
          marginX: "auto",
          paddingY: 0.5,
          backgroundColor: "neutral.main",
        }}
      >
        {children}
      </Box>
      <BottomNav />
    </>
  );
};

export default Layout;
