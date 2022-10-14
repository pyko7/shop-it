import { FC, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import ItemQuantityButtons from "../Buttons/ItemQuantityButtons";
import { Product } from "../../utils/fetchProducts/getAllProducts";
import { useCartContext } from "../../context/CartContext";

interface ProductProps {
  product: Product;
}
const ProductInCartCard: FC<ProductProps> = ({ product }): JSX.Element => {
  const { getProductQuantity } = useCartContext();
  const [quantity, setQuantity] = useState(getProductQuantity(product.id));
  const [isVisible, setIsVisible] = useState(false);

  const handleDisplay = () => {
    if (typeof quantity === "number" && quantity < 1) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
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
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Checkbox aria-label="Select items" sx={{ padding: 0 }} />
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
                  height={90}
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
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
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
