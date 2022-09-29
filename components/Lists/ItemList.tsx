import { FC } from "react";
import { StateProps } from "../../context/CategoryContext";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  Product,
} from "../../utils/fetchProducts/getAllProducts";
import ItemCard from "../Cards/ItemCard";
import useAllProductsData from "../../hooks/useAllProductsData";
import useProductByCategory from "../../hooks/useProductByCategory";
import { useDisplayProductsByCategory } from "../../hooks/useDisplayProductsByCategory";

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
            marginTop: 3,
            paddingX: 2.5,
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <ProductsGrid
            container
            rowSpacing={1.5}
            columnSpacing={{ xs: 1, md: 3, xl: 1 }}
          >
            {data?.map((product: Product) => (
              <Grid item xs={6} xl={2} key={product.id}>
                <ItemCard product={product} />
              </Grid>
            ))}
          </ProductsGrid>
        </Box>
      )}
    </>
  );
};

export default NewArrivalList;
