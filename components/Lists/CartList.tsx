import { FC, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useTheme, useMediaQuery, Typography } from "@mui/material";
import { useCartContext } from "../../context/CartContext";
import ProductInCartCard from "../Cards/ProductInCartCard";
import { Product } from "../../utils/fetchProducts/getAllProducts";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";

const CartList: FC = (): JSX.Element => {
  const theme = useTheme();
  const { getCart, cartTotalQuantity } = useCartContext();
  const [isCart, setIsCart] = useState<Product[]>([]);
  const cart = getCart();
  const isBiggerThanMobile = useMediaQuery(theme.breakpoints.up("sm"));

  const getCartProducts = useCallback(async () => {
    const cartProducts = cart.map((product) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${product.id}`)
    );
    await Promise.all(cartProducts)
      .then((res) => Promise.all(res.map((r) => r.json())))
      .then((data) => {
        setIsCart(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getCartProducts();
  }, [getCartProducts]);

  return (
    <Box
      sx={{
        width: 1,
        maxWidth: 1500,
        marginTop: 3,
        marginX: "auto",
        paddingY: isBiggerThanMobile ? 2.5 : 0,
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
            fontSize: 22,
            fontWeight: 500,
          }}
        >
          My Bag
        </Typography>

        <Box
          sx={{
            width: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <FormGroup sx={{ marginY: 2 }}>
            <FormControlLabel
              control={<Checkbox aria-label="Select all items" />}
              label="Select all items"
            />
          </FormGroup>

          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Box>
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
      <Grid container>
        <Grid
          item
          sx={{
            width: 1,
            display: isBiggerThanMobile ? "flex" : "block",
            justifyContent: "center",
          }}
        >
          {isCart.map((product) => (
            <ProductInCartCard product={product} key={product.id} />
          ))}
          {cartTotalQuantity >= 1 ? null : (
            <Box sx={{ width: 1, marginY: 2, textAlign: "center" }}>
              <ShoppingCartIcon aria-hidden="true" sx={{ fontSize: 28 }} />
              <Typography sx={{ marginY: 0.75 }}>Your cart is empty</Typography>
              <Link href="/">
                <a>
                  <Button>Go to shopping</Button>
                </a>
              </Link>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartList;
