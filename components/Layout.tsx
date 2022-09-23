import { Box } from "@mui/material";
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
        <link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
        sx={{
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <Box component="main" sx={{ width: "100%" }}>
          {children}
        </Box>
        <BottomNav />
      </Box>
    </>
  );
};

export default Layout;
