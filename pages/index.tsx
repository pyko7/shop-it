import type { NextPage } from "next";
import { useState } from "react";
import { CategoryContext, StateProps } from "../context/CategoryContext";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import NewArrivalList from "../components/Lists/NewArrivalList";
import CategoriesList from "../components/Lists/CategoriesList";
import ItemList from "../components/Lists/ItemList";
import ScrollToTopButton from "../components/Navigation/ScrollToTopButton";

const Home: NextPage = () => {
  const theme = useTheme();
  const [category, setCategory] = useState<string | null>(null);
  const categoryState: StateProps = { category, setCategory };
  const isBiggerThanTablet = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      {/*New arrival section*/}
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
        <NewArrivalList />
      </Box>

      <CategoryContext.Provider value={{ category, setCategory }}>
        <Box
          component="section"
          sx={{
            width: "100%",
            maxWidth: 1500,
            margin: "0 auto",
            gap: 2.5,
          }}
        >
          <CategoriesList {...categoryState} />

          <ItemList {...categoryState} />
        </Box>
      </CategoryContext.Provider>
      <ScrollToTopButton />
    </>
  );
};

export default Home;
