import { useState, useEffect, useCallback } from "react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useCartContext } from "~/context/CartContext";
import CartDropDownButton from "../Buttons/CartDropDownButton";
import DropdownMenuCard from "../Cards/DropdownMenuCard";
import { useQueries } from "@tanstack/react-query";
import { getProductById } from "~/utils/fetchProducts/getProductsById";
import LoadingSpinner from "../UserFeedback/LoadingSpinner";
import ErrorMessage from "../UserFeedback/ErrorMessage";

const CartDropdown = () => {
  const { getCart, cartTotalQuantity } = useCartContext();
  const cart = getCart();
  const [totalPrice, setTotalPrice] = useState(0);

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

  const getProductPrices = useCallback(() => {
    let productPrice: number[] = [];

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
  }, [cart, userQueries]);

  useEffect(() => {
    getProductPrices();
  }, [getProductPrices]);

  const Dropdown = styled(Box)({
    position: "relative",
    width: 300,
    height: "100%",
    maxHeight: 900,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 10,
    display: "flex",
    flexDirection: "column",
    borderBottomRadius: 4,
  });

  return (
    <Dropdown>
      <Box
        sx={{
          width: 1,
          height: 50,
          marginY: 1,
          display: "flex",
          gap: 2,
          borderBottom: "1px solid black",
        }}
      >
        <Typography
          sx={{
            height: 1,
            display: "flex",
            alignItems: "center",
            marginBottom: 2,
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          My Bag,
        </Typography>
        <Typography
          sx={{
            height: 1,
            display: "flex",
            alignItems: "center",
            marginBottom: 2,
            fontSize: 14,
          }}
        >
          {cartTotalQuantity > 1
            ? cartTotalQuantity + " items"
            : cartTotalQuantity + " item"}
        </Typography>
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
                <DropdownMenuCard
                  product={product.data!}
                  key={product.data?.id}
                />
              ))}
            </Grid>
          </Grid>
        )}
      </>
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          width: 1,
          paddingBottom: 2,
          paddingX: 1,
          bgcolor: "#fff",
        }}
      >
        <Box
          sx={{
            marginTop: 2,
            paddingY: 2,
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
          }}
        >
          <Typography sx={{ fontWeight: 500 }}>Total price:</Typography>
          <Typography sx={{ fontWeight: 700 }}>${totalPrice}</Typography>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <CartDropDownButton />
        </Box>
      </Box>
    </Dropdown>
  );
};

export default CartDropdown;
