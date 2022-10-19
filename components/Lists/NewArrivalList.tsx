import { FC, useEffect, useState } from "react";
import { useMediaQuery, useTheme, styled } from "@mui/material";
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

const NewArrivalList: FC = (): JSX.Element => {
  const { isLoading, error, data } = useAllProductsData();
  const [products, setProducts] = useState<Product[]>([]);
  const theme = useTheme();
  const isBiggerThanMobile = useMediaQuery(theme.breakpoints.up("sm"));

  /*avoid display of others products when user change category*/
  useEffect(() => {
    const displayRandomProducts = () => {
      if (data) {
        for (let i = 0; i < 4; i++) {
          let randomProduct: Product =
            data[Math.floor(Math.random() * data?.length)];
          const existingProduct: boolean = products.includes(randomProduct);
          if (existingProduct) {
            i--;
          } else {
            setProducts((productsArray) => [...productsArray, randomProduct]);
          }
        }
      }
    };
    displayRandomProducts();
  }, [data]);

  const ProductsGrid = styled(Grid)(({ theme }) => ({
    padding: 0,
    [theme.breakpoints.up("md")]: {
      flexWrap: "nowrap",
    },
  }));

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
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
              {products.map((product) => (
                <Grid
                  item
                  xs={6}
                  xl={2}
                  sx={{
                    display: isBiggerThanMobile ? "flex" : "block",
                    justifyContent: "center",
                  }}
                  key={product.id}
                >
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
