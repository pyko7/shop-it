import { FC, useState } from "react";
import Button from "@mui/material/Button";
import { useMediaQuery, useTheme } from "@mui/material";
import { useCartContext } from "~/context/CartContext";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface AddToCartButtonProps {
  productId: number;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({
  productId,
}): JSX.Element => {
  const { increaseQuantity, cartTotalQuantity, setCartTotalQuantity } =
    useCartContext();
  const [isAdded, setIsAdded] = useState(false);
  const theme = useTheme();
  const isBiggerThanMobile = useMediaQuery(theme.breakpoints.up("sm"));

  const addToCart = () => {
    increaseQuantity(productId);
    setIsAdded(true);
    setCartTotalQuantity(cartTotalQuantity + 1);
    setTimeout(() => {
      setIsAdded(false);
    }, 5000);
  };

  return (
    <Button
      variant="contained"
      fullWidth
      sx={{ maxWidth: isBiggerThanMobile ? 250 : 450, paddingY: 1.25 }}
      onClick={() => addToCart()}
      startIcon={isAdded ? <CheckCircleOutlineIcon /> : null}
    >
      {isAdded ? "Added" : "Add to cart"}
    </Button>
  );
};

export default AddToCartButton;
