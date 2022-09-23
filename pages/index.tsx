import type { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import NewItemCard from "../components/Cards/NewItemCard";

const Home: NextPage = () => {
  return (
    /*New arrival section*/
    <Box
      component="section"
      sx={{ width: "100%", minHeight: "100vh", paddingY: 2, paddingX: 3 }}
    >
      <Box
        sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2.5 }}
      >
        <Typography variant="h1" sx={{ fontSize: 24, fontWeight: "bold" }}>
          New Arrival
        </Typography>
        <NewItemCard />
      </Box>
    </Box>
  );
};

export default Home;
