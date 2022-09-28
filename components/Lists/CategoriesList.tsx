import { FC } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useAllProductsData from "../../hooks/useAllProductsData";
import { Product } from "../../utils/fetchProducts/getAllProducts";
import Link from "next/link";

const CategoriesList: FC = (): JSX.Element => {
  const { isLoading, error, data } = useAllProductsData();
  const theme = useTheme();
  const isDesktopScreen = useMediaQuery(theme.breakpoints.up("xl"));
  let categories: string[] = [];

  data?.products.forEach((product: Product) => {
    if (categories.includes(product.category)) {
      categories.filter((category) => category === product.category);
    } else {
      categories.push(product.category);
    }
    return categories.sort((a, b) => a.localeCompare(b));
  });

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Error...</h1>
      ) : (
        <Box
          sx={{
            width: 1,
            paddingLeft: 1.5,
            paddingRight: 0.25,
            bgcolor: "primary.dark",
          }}
        >
          <Grid
            container
            wrap="nowrap"
            sx={{
              width: 1,
              overflowX: isDesktopScreen ? "hidden" : "scroll",
            }}
            columnSpacing={2.5}
          >
            {categories.map((category) => (
              <Grid item key={category} sx={{}}>
                <Link href="#">
                  <a
                    style={{
                      width: "fit-content",
                      height: "100%",
                      padding: "3.5px 0",
                      color: "inherit",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "neutral.main",
                        fontWeight: 500,
                      }}
                    >
                      {category}
                    </Typography>
                  </a>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default CategoriesList;
//overflow-x:scroll
