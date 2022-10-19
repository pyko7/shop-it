import { FC } from "react";
import { StateProps } from "../../context/CategoryContext";
import { useTheme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  Product,
} from "../../utils/fetchProducts/getAllProducts";
import GridItemCard from "../Cards/GridItemCard";
import { useDisplayProductsByCategory } from "../../hooks/useDisplayProductsByCategory";
import LoadingSpinner from "../Loaders/LoadingSpinner";

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["allProducts"], () => getAllProducts());
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const NewArrivalList: FC<StateProps> = ({ category }): JSX.Element => {
  const { isLoading, error, data } = useDisplayProductsByCategory(category);
  const theme = useTheme();
  const isBiggerThanMobile = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <Box
          sx={{
            width: 1,
            maxWidth: 1500,
            marginTop: 3,
            marginX: "auto",
            padding: 2.5,
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            backgroundColor: "neutral.light",
            borderRadius: 1,
          }}
        >
          <Grid
            container
            rowSpacing={{ xs: 2, sm: 2.5, md: 3 }}
            columnSpacing={{ xs: 1, md: 3, xl: 1 }}
          >
            {data?.map((product: Product) => (
              <Grid
                item
                xs={6}
                md={4}
                lg={3}
                sx={{
                  display: isBiggerThanMobile ? "flex" : "block",
                  justifyContent: "center",
                }}
                key={product.id}
              >
                <GridItemCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default NewArrivalList;
