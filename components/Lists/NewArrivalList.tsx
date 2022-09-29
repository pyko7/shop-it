import { FC } from "react";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  Product,
} from "../../utils/fetchProducts/getAllProducts";
import NewArrivalItem from "../Cards/NewArrivalItem";
import useAllProductsData from "../../hooks/useAllProductsData";
import { getRandomProducts } from "../../utils/products/getRandomProducts";

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["allProducts"], () => getAllProducts());
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const NewArrivalList: FC = (): JSX.Element => {
  const { isLoading, error, data } = useAllProductsData();
  let randomProducts: Product[] = [];

  if (data !== undefined) {
    getRandomProducts(data, 4, randomProducts);
  }

  const ProductsGrid = styled(Grid)(({ theme }) => ({
    padding: 0,
    [theme.breakpoints.up("md")]: {
      flexWrap: "nowrap",
    },
  }));

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Error</h1>
      ) : (
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
            <ProductsGrid
              container
              rowSpacing={1.5}
              columnSpacing={{ xs: 1, md: 3, xl: 1 }}
            >
              {randomProducts.map((product) => (
                <Grid item xs={6} xl={2} key={product.id}>
                  <NewArrivalItem product={product} />
                </Grid>
              ))}
            </ProductsGrid>
          </Box>
        </Box>
      )}
    </>
  );
};

export default NewArrivalList;
