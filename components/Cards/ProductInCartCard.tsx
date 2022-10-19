import { FC, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import ItemQuantityButtons from "../Buttons/ItemQuantityButtons";
import { useCartContext } from "../../context/CartContext";
import { ProductProps } from "./NewArrivalItem";
import { useTheme } from "@mui/material";

const ProductInCartCard: FC<ProductProps> = ({ product }): JSX.Element => {
  const theme = useTheme();
  const {
    getProductQuantity,
    removeProductFromCart,
    cartTotalQuantity,
    setCartTotalQuantity,
  } = useCartContext();
  const [quantity, setQuantity] = useState(getProductQuantity(product.id));
  const [isVisible, setIsVisible] = useState(false);

  const handleDisplay = () => {
    if (typeof quantity === "number" && quantity < 1) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  const removeProduct = () => {
    setCartTotalQuantity(cartTotalQuantity - quantity!);
    setQuantity(0);
    removeProductFromCart(product.id);
  };

  useEffect(() => {
    handleDisplay();
  }, [quantity]);

  return (
    <>
      {!isVisible ? null : (
        <Box
          sx={{
            width: "100%",
            marginY: 1.5,
            paddingY: 1,
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",

            borderBottom: `1px solid ${theme.palette.neutral?.main}`,
            "&:last-child": {
              borderBottom: "1px solid transparent",
            },
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
                sx={{ position: "absolute", top: 0, right: 0, padding: 0 }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>

              <ItemQuantityButtons
                productId={product.id}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProductInCartCard;
