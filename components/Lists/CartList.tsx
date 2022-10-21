import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { useTheme, useMediaQuery, Typography } from "@mui/material";
import { useCartContext } from "../../context/CartContext";
import ProductInCartCard from "../Cards/ProductInCartCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useQueries } from "@tanstack/react-query";
import { getProductById } from "../../utils/fetchProducts/getProductsById";
import LoadingSpinner from "../UserFeedback/LoadingSpinner";
import ErrorMessage from "../UserFeedback/ErrorMessage";

export interface ProductInCart {
  id: number;
}
const CartList: FC = (): JSX.Element => {
  const theme = useTheme();
  const { getCart, cartTotalQuantity } = useCartContext();
  const cart = getCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const isBiggerThanMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const isLaptop = useMediaQuery(theme.breakpoints.between("sm", "lg"));

  let productPrice: number[] = [];

  const userQueries = useQueries({
    queries: cart.map((product) => {
      return {
        queryKey: ["product", product.id],
        queryFn: () => getProductById(product.id),
        staleTime: Infinity,
      };
    }),
  });

  const isLoading = userQueries.some((userQuery) => userQuery.isLoading);
  const error = userQueries.some((userQuery) => userQuery.error);

  const getProductPrices = () => {
    userQueries.forEach((product) => {
      cart.map((item) => {
        if (product.data?.id === item.id) {
          productPrice.push(product.data?.price * item.quantity);
        }
      });
    });
    setTotalPrice(
      productPrice.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      )
    );
  };

  useEffect(() => {
    getProductPrices();
  }, [cart]);

  return (
    <Box
      sx={{
        width: 1,
        maxWidth: 1500,
        marginTop: 3,
        marginX: "auto",
        paddingY: isBiggerThanMobile ? 2.5 : 0,
        backgroundColor: "neutral.light",
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          width: 1,
          maxWidth: 1100,
          paddingX: isLaptop ? 2.5 : 0,
          marginTop: 0,
          marginX: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
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
            My Bag
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
            <Grid container>
              <Grid
                item
                sx={{
                  width: 1,
                  display: "block",
                  justifyContent: "center",
                }}
              >
                {userQueries.map((product) => (
                  <ProductInCartCard
                    product={product.data!}
                    key={product.data?.id}
                  />
                ))}
                {cartTotalQuantity >= 1 ? null : (
                  <Box sx={{ width: 1, marginY: 2, textAlign: "center" }}>
                    <ShoppingCartIcon
                      aria-hidden="true"
                      sx={{ fontSize: 28 }}
                    />
                    <Typography sx={{ marginY: 0.75 }}>
                      Your cart is empty
                    </Typography>
                    <Link href="/">
                      <a>
                        <Button>Go to shopping</Button>
                      </a>
                    </Link>
                  </Box>
                )}
              </Grid>
            </Grid>
          )}
        </>
        <Box
          sx={{
            width: 1,
            height: "fit-content",
            marginY: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ paddingX: 2 }}>
            <Typography
              sx={{
                fontSize: 16,
              }}
            >
              Total price
            </Typography>
            <Typography sx={{ fontSize: 20, fontWeight: 500 }}>
              $ {totalPrice}
            </Typography>
          </Box>

          <Button
            href="/checkout"
            variant="contained"
            size={isBiggerThanMobile ? "medium" : "small"}
            sx={{
              width: "50%",
              maxWidth: isBiggerThanMobile ? 250 : 450,
            }}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CartList;
