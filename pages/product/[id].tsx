import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import useProductByIdData from "../../hooks/useProductByIdData";
import ProductCard from "../../components/Cards/ProductCard";
import LoadingSpinner from "../../components/UserFeedback/LoadingSpinner";
import ErrorMessage from "../../components/UserFeedback/ErrorMessage";

const ItemPage: NextPage = () => {
  const router = useRouter();
  const itemId = parseInt(router.query["id"] as string);
  const theme = useTheme();
  const isBiggerThanTablet = useMediaQuery(theme.breakpoints.up("md"));

  const { isLoading, error, data } = useProductByIdData(itemId);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage />
      ) : (
        <Box
          component="section"
          sx={{
            width: "100%",
            maxWidth: 1500,
            padding: 2.5,
            marginTop: isBiggerThanTablet ? 6 : 0,
            marginX: "auto",
            backgroundColor: "neutral.light",
            borderRadius: 1,
          }}
        >
          <ProductCard product={data!} />
        </Box>
      )}
    </>
  );
};

export default ItemPage;
