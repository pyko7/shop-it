import type { NextPage } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import NewArrivalList from "../components/Lists/NewArrivalList";

const Home: NextPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return (
    /*New arrival section*/
    <Box
      component="section"
      sx={{
        width: "100%",
        minHeight: "100vh",
        padding: 2.5,
        marginTop: matches ? 6 : null,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
        <Typography variant="h1" sx={{ fontSize: 24, fontWeight: "bold" }}>
          New Arrival
        </Typography>
        <Box sx={{ width: "100%" }}>
          <NewArrivalList />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
