import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductProps } from "./NewArrivalItem";
import { useCartContext } from "~/context/CartContext";

const DropdownMenuCard: FC<ProductProps> = ({ product }) => {
  const theme = useTheme();
  const {
    getProductQuantity,
    removeProductFromCart,
    cartTotalQuantity,
    setCartTotalQuantity,
  } = useCartContext();
  const [quantity, setQuantity] = useState(getProductQuantity(product.id));
  const [isVisible, setIsVisible] = useState(true);

  const removeProduct = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCartTotalQuantity(cartTotalQuantity - quantity!);
      setQuantity(0);
      removeProductFromCart(product.id);
    }, 600);
  };

  return (
    <Slide
      direction="right"
      appear={false}
      in={isVisible}
      mountOnEnter
      unmountOnExit
    >
      <Box
        sx={{
          width: "100%",
          marginY: 0.5,
          padding: "5px",
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          backgroundColor: theme.palette.neutral?.light,
          color: "inherit",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            gap: 1.5,
          }}
        >
          <Link
            href={{
              pathname: `/product/[id]`,
              query: { id: `${product.id}` },
            }}
          >
            <a>
              <Image
                loader={() => product?.thumbnail!}
                unoptimized={true}
                src={product?.thumbnail!}
                alt={product?.title}
                layout="fixed"
                height={100}
                width={90}
                objectFit="cover"
                objectPosition="50% 50%"
              />
            </a>
          </Link>

          <Box
            sx={{
              width: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 0.25,
            }}
          >
            <Typography variant="h4" sx={{ fontSize: 18, fontWeight: 500 }}>
              $ {product?.price}
            </Typography>
            <Typography sx={{ fontSize: 14 }}>{product?.title}</Typography>
            <Typography sx={{ fontSize: 12 }}>by {product?.brand}</Typography>
            <Typography sx={{ fontSize: 12 }}>Qty: {quantity}</Typography>
          </Box>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <IconButton
              aria-label="delete"
              onClick={() => removeProduct()}
              color="default"
              sx={{ position: "absolute", bottom: 10, right: 5, padding: 0 }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Slide>
  );
};

export default DropdownMenuCard;
