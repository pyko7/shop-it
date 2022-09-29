import type { NextPage } from "next";
import { useState } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import NewArrivalList from "../components/Lists/NewArrivalList";
import CategoriesList from "../components/Lists/CategoriesList";
import ItemList from "../components/Lists/ItemList";
import ScrollToTopButton from "../components/Navigation/ScrollToTopButton";
import { getProductByCategories } from "../utils/fetchProducts/getProductsByCategories";
import { CategoryContext, StateProps } from "../context/CategoryContext";

const Home: NextPage = () => {
  const theme = useTheme();
  const [category, setCategory] = useState<string | null>(null);
  const categoryState: StateProps = { category, setCategory };
  const isBiggerThanTablet = useMediaQuery(theme.breakpoints.up("md"));
  getProductByCategories("fragrances");
  return (
    <>
      {/*New arrival section*/}
      <Box
        component="section"
        sx={{
          width: "100%",
          paddingX: 2.5,
          marginTop: isBiggerThanTablet ? 6 : 3,
        }}
      >
        <NewArrivalList />
      </Box>
      {/*New arrival section*/}
      <CategoryContext.Provider value={{ category, setCategory }}>
        <Box
          component="section"
          sx={{
            width: "100%",
            paddingY: 1.5,
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
