import type { NextPage } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import NewArrivalList from "../components/Lists/NewArrivalList";
import CategoriesList from "../components/Lists/CategoriesList";

const Home: NextPage = () => {
  const theme = useTheme();
  const isBiggerThanTablet = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      /*New arrival section*/
      <Box
        component="section"
        sx={{
          width: "100%",
          paddingX: 2.5,
          marginTop: isBiggerThanTablet ? 6 : null,
        }}
      >
        <Box
          sx={{
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
      <Box
        component="section"
        sx={{
          width: "100%",
          paddingY: 1.5,
        }}
      >
        <CategoriesList />
      </Box>
    </>
  );
};

export default Home;
