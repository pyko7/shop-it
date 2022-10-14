import { FC, useState, useCallback, useEffect } from "react";
import { useFavoriteProductsList } from "../../context/FavoriteProductsContext";
import { useTheme, useMediaQuery, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Product } from "../../utils/fetchProducts/getAllProducts";
import GridItemCard from "../Cards/GridItemCard";

const FavoriteList: FC = (): JSX.Element => {
  const [favoriteList, setFavoriteList] = useState<Product[]>([]);
  const { state } = useFavoriteProductsList();
  const theme = useTheme();
  const isBiggerThanMobile = useMediaQuery(theme.breakpoints.up("sm"));

  const getFavoriteProducts = useCallback(async () => {
    const favoriteProducts = state.idList.map((id) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
    );
    await Promise.all(favoriteProducts)
      .then((res) => Promise.all(res.map((r) => r.json())))
      .then((data) => {
        setFavoriteList(data);
      })
      .catch((error) => console.log(error));
  }, [state.idList]);

  useEffect(() => {
    getFavoriteProducts();
  }, [state, getFavoriteProducts]);

  return (
    <Box
      sx={{
        width: 1,
        maxWidth: 1500,
        marginTop: 3,
        marginX: "auto",
        paddingY: isBiggerThanMobile ? 2.5 : 0,
        paddingX: 2.5,
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        backgroundColor: "neutral.light",
        borderRadius: 1,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: 22,
          fontWeight: 500,
        }}
      >
        My favorites
      </Typography>
      <Grid
        container
        rowSpacing={{ xs: 2, sm: 2.5, md: 3 }}
        columnSpacing={{ xs: 1, md: 3, xl: 1 }}
      >
        {favoriteList?.map((product: Product) => (
          <Grid
            item
            xs={6}
            md={4}
            lg={3}
            sx={{
              display: isBiggerThanMobile ? "flex" : "block",
              justifyContent: "center",
            }}
            key={product?.id}
          >
            <GridItemCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FavoriteList;
