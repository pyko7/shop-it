import Link from "next/link";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";

const CartDropDownButton = () => {
  const ModalButtonColored = styled("a")(({ theme }) => ({
    width: "100%",
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: theme.palette.primary.main,
    textTransform: "uppercase",
    textDecoration: "none",
    cursor: "pointer",
  }));
  const ModalButtonNeutral = styled("a")(({ theme }) => ({
    width: "100%",
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    border: `1px solid ${theme.palette.neutral?.dark}`,
    backgroundColor: theme.palette.neutral?.light,
    textTransform: "uppercase",
    textDecoration: "none",
    cursor: "pointer",
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
      <Link href="/cart">
        <ModalButtonNeutral>View bag</ModalButtonNeutral>
      </Link>
      <Link href="/checkout">
        <ModalButtonColored>Payment</ModalButtonColored>
      </Link>
    </Box>
  );
};

export default CartDropDownButton;
