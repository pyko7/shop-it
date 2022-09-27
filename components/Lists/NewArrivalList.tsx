import { FC } from "react";
import Grid from "@mui/material/Grid";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import {
  getAllProducts,
  Product,
} from "../../utils/fetchProducts/getAllProducts";
import NewArrivalItem from "../Cards/NewArrivalItem";

export async function getStaticProps() {
  const id: number = 1;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["allProducts"], () => getAllProducts());
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const NewArrivalList: FC = (): JSX.Element => {
  const { isLoading, error, data } = useQuery(["allProducts"], () =>
    getAllProducts()
  );
  let randomProductArray: Product[] = [];

  /*ADD STATEMENT TO AVOID 2 SIMILAR ITEMS IN GRID*/
  const getRandomProducts = (): Product[] => {
    for (let i = 0; i < 4; i++) {
      let randomProduct =
        data?.products[Math.floor(Math.random() * data?.products.length)];
      randomProductArray.push(randomProduct!);
    }
    return randomProductArray;
  };

  getRandomProducts();
  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {randomProductArray.map((product) => (
            <Grid item xs={6}>
              <NewArrivalItem product={product} key={product.id} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default NewArrivalList;
