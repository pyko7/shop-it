import { FC } from "react";
import Image from "next/image";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { getProductById } from "../../utils/fetchProducts/getProductsById";
import { Card, CardContent, styled, Typography, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export async function getStaticProps() {
  const id: number = 1;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["newArrivals", id], () =>
    getProductById(id)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const NewItemCard: FC = (): JSX.Element => {
  const id: number = 1;
  const CardContentNoPadding = styled(CardContent)(
    `
  padding: 0px;
  &:last-child {
    padding-bottom: 0px;
  }`
  );

  const { isLoading, error, data } = useQuery(["newArrival"], () =>
    getProductById(id)
  );

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Error....</h1>
      ) : (
        <Card
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 280,
            height: 170,
          }}
        >
          <CardContentNoPadding
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <Box sx={{ position: "relative", width: 1, height: 1 }}>
              <Image
                src={data?.thumbnail!}
                alt={data?.title}
                layout="fill"
                objectFit="cover"
              />
            </Box>
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: 1,
                height: 80,
                paddingLeft: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 0.5,
                color: "neutral.light",
                bgcolor: "neutral.dark",
              }}
            >
              <Typography variant="h3" sx={{ fontSize: 16 }}>
                {data?.title}
              </Typography>
              <Typography sx={{ fontSize: 12 }}>{data?.description}</Typography>
            </Box>
          </CardContentNoPadding>
        </Card>
      )}
    </>
  );
};

export default NewItemCard;
