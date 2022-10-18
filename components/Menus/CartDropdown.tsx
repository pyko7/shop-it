import { useState, useCallback, useEffect } from "react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useCartContext } from "../../context/CartContext";
import { Product } from "../../utils/fetchProducts/getAllProducts";
import CartDropDownButton from "../Buttons/CartDropDownButton";
import AddedProductInModal from "../Cards/AddedProductInModal";

const CartDropdown = () => {
  const { getCart, cartTotalQuantity } = useCartContext();
  const cart = getCart();
  const [isCart, setIsCart] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

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

  const Dropdown = styled(Box)({
    position: "relative",
    width: 300,
    height: "100%",
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
        {isCart.map((product) => {
          return <AddedProductInModal product={product} key={product.id} />;
        })}
      </>

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
    </Dropdown>
  );
};

export default CartDropdown;
