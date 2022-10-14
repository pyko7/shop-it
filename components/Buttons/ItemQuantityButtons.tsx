import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useCartContext } from "../../context/CartContext";

type productIdProps = {
  productId: number;
  quantity: number | undefined;
  setQuantity: (quantity: number) => void;
};

const ItemQuantityButtons = ({
  productId,
  quantity,
  setQuantity,
}: productIdProps) => {
  const {
    increaseQuantity,
    decreaseQuantity,
    cartTotalQuantity,
    setCartTotalQuantity,
    removeProductFromCart,
  } = useCartContext();

  const QuantityButtons = styled(IconButton)(({ theme }) => ({
    color: "inherit",
    padding: 0,
    "&:hover": {
      color: theme.palette.primary.dark,
      backgroundColor: "transparent",
    },
  }));

  const increaseProductQuantity = () => {
    if (typeof quantity === "number") {
      increaseQuantity(productId);

      setQuantity(quantity + 1);
      setCartTotalQuantity(cartTotalQuantity + 1);
    }
  };

  const decreaseProductQuantity = () => {
    if (typeof quantity === "number") {
      setQuantity(quantity - 1);
      setCartTotalQuantity(cartTotalQuantity - 1);
      decreaseQuantity(productId);
    }
    if (typeof quantity === "number" && quantity === 1) {
      setQuantity(0);
      removeProductFromCart(productId);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.25,
      }}
    >
      <QuantityButtons
        disabled={quantity && quantity < 1 ? true : false}
        aria-label="decrease quantity"
        onClick={() => decreaseProductQuantity()}
      >
        <RemoveCircleIcon />
      </QuantityButtons>
      {quantity}
      <QuantityButtons
        aria-label="increase quantity"
        onClick={() => increaseProductQuantity()}
      >
        <AddCircleIcon />
      </QuantityButtons>
    </Box>
  );
};

export default ItemQuantityButtons;
