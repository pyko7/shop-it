import { FC, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useTheme, useMediaQuery, Typography } from "@mui/material";
import { useCartContext } from "../../context/CartContext";
import ProductInCartCard from "../Cards/ProductInCartCard";
import { Product } from "../../utils/fetchProducts/getAllProducts";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export interface ProductInCart {
  id: number;
}
const CartList: FC = (): JSX.Element => {
  const theme = useTheme();
  const { getCart, cartTotalQuantity } = useCartContext();
  const cart = getCart();
  const [isCart, setIsCart] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const isBiggerThanMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const isLaptop = useMediaQuery(theme.breakpoints.between("sm", "lg"));

  let productPrice: number[] = [];

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

  const getProductPrices = () => {
    isCart.forEach((product) => {
      cart.map((item) => {
        if (product.id === item.id) {
          productPrice.push(product.price * item.quantity);
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
    getCartProducts();
  }, [getCartProducts]);

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
        <Grid container>
          <Grid
            item
            sx={{
              width: 1,
              display: "block",
              justifyContent: "center",
            }}
          >
            {isCart.map((product) => (
              <ProductInCartCard product={product} key={product.id} />
            ))}
            {cartTotalQuantity >= 1 ? null : (
              <Box sx={{ width: 1, marginY: 2, textAlign: "center" }}>
                <ShoppingCartIcon aria-hidden="true" sx={{ fontSize: 28 }} />
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
            variant="contained"
            sx={{
              width: "50%",
              maxWidth: isBiggerThanMobile ? 250 : 450,
              paddingY: 1.25,
            }}
          >
            Buy
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CartList;
