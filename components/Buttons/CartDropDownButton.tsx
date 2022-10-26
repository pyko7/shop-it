import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useCartContext } from "~/context/CartContext";

const CartDropDownButton = () => {
  const { cartTotalQuantity } = useCartContext();

  const ModalButtonColored = styled(Button)(({ theme }) => ({
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.neutral?.dark,
    "&.Mui-disabled": {
      backgroundColor: theme.palette.neutral?.main,
    },
  }));
  const ModalButtonNeutral = styled(Button)(({ theme }) => ({
    width: "100%",
    border: `1px solid ${theme.palette.neutral?.dark}`,
    color: theme.palette.neutral?.dark,
  }));

  return (
    <Box
      sx={{
        width: 1,
        height: 50,
        display: "flex",
        justifyContent: "space-between",
        gap: 2.5,
      }}
    >
      <ModalButtonNeutral href="/cart">View bag</ModalButtonNeutral>

      <ModalButtonColored
        href="/checkout"
        disabled={cartTotalQuantity < 1 ? true : false}
      >
        Payment
      </ModalButtonColored>
    </Box>
  );
};

export default CartDropDownButton;
