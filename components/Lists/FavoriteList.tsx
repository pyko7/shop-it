import { FC } from "react";
import { useFavoriteProductsList } from "~/context/FavoriteProductsContext";
import { useTheme, useMediaQuery, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Zoom from "@mui/material/Zoom";
import GridItemCard from "../Cards/GridItemCard";
import { useQueries } from "@tanstack/react-query";
import { getProductById } from "~/utils/fetchProducts/getProductsById";
import LoadingSpinner from "../UserFeedback/LoadingSpinner";
import ErrorMessage from "../UserFeedback/ErrorMessage";

const FavoriteList: FC = (): JSX.Element => {
  const { state } = useFavoriteProductsList();
  const theme = useTheme();
  const isBiggerThanMobile = useMediaQuery(theme.breakpoints.up("sm"));

  const userQueries = useQueries({
    queries: state.idList.map((id) => {
      return {
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
        staleTime: Infinity,
      };
    }),
  });
  const isLoading = userQueries.some((userQuery) => userQuery.isLoading);
  const error = userQueries.some((userQuery) => userQuery.error);

  return (
    <Box
      sx={{
        width: 1,
        maxWidth: 1500,
        marginTop: 3,
        marginX: "auto",
        paddingY: isBiggerThanMobile ? 2.5 : 0,
        paddingX: 0.5,
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        backgroundColor: "neutral.light",
        borderRadius: 1,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Typography
          variant="h2"
          sx={{
            marginBottom: 2,
            fontSize: 22,
            fontWeight: 500,
          }}
        >
          My favorites
        </Typography>

        <Box
          component="span"
          sx={{
            position: "absolute",
            bottom: 0,
            width: 1,
            height: 2,
            backgroundColor: "neutral.main",
          }}
        />
      </Box>
      <>
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage />
        ) : (
          <Grid
            container
            rowSpacing={{ xs: 2, sm: 2.5, md: 3 }}
            columnSpacing={{ xs: 1, md: 3, xl: 1 }}
          >
            {userQueries?.map((product) => (
              <Grid
                item
                xs={6}
                md={4}
                lg={3}
                sx={{
                  display: isBiggerThanMobile ? "flex" : "block",
                  justifyContent: "center",
                }}
                key={product.data?.id}
              >
                <GridItemCard product={product.data!} />
              </Grid>
            ))}
          </Grid>
        )}
      </>
    </Box>
  );
};

export default FavoriteList;
