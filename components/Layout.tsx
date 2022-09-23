import { Box } from "@mui/material";
import { ReactElement, ReactNode } from "react";
import Header from "./Header";

const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <Box component="main"> {children}</Box>
      <Header />
    </>
  );
};

export default Layout;
