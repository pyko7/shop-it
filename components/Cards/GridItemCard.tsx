import { FC, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFavoriteProductsList } from "~/context/FavoriteProductsContext";
import { Product } from "~/utils/fetchProducts/getAllProducts";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grow from "@mui/material/Grow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

interface ProductProps {
  product: Product;
}

const ItemCard: FC<ProductProps> = ({ product }): JSX.Element => {
  const [isFav, setIsFav] = useState<boolean>(false);
  const { handleFavoriteIcon, handleFavorite } = useFavoriteProductsList();
  let isInFavoriteList = handleFavoriteIcon(product?.id);

  useEffect(() => {
    return isInFavoriteList ? setIsFav(true) : setIsFav(false);
  }, [isInFavoriteList]);

  return (
    <Link
      href={{
        pathname: `/product/[id]`,
        query: { id: `${product.id}` },
      }}
    >
      <a
        style={{
          width: "100%",
          maxWidth: 280,
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <Card
          component="article"
          sx={{
            position: "relative",
            width: 1,
            maxWidth: 280,
            height: 255,
          }}
        >
          <CardActionArea
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <CardContent
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ position: "relative", width: 1, height: "60%" }}>
                <Image
                  loader={() => product?.thumbnail!}
                  unoptimized={true}
                  src={product?.thumbnail!}
                  alt={product?.title}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="50% 50%"
                />
              </Box>

              <Box
                sx={{ width: 1, height: "30%", paddingX: 1.25, paddingY: 2 }}
              >
                <Typography variant="h4" sx={{ fontSize: 18 }}>
                  $ {product?.price}
                </Typography>
                <Typography sx={{ fontSize: 14 }}>{product?.title}</Typography>
                <Typography sx={{ fontSize: 12 }}>
                  by {product?.brand}
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
          <CardActions
            sx={{
              position: "absolute",
              top: 2,
              right: 2,
              width: "fit-content",
            }}
            disableSpacing
          >
            <IconButton
              sx={{ width: 14, height: 14 }}
              onClick={(event) => handleFavorite(event, product.id)}
            >
              {isFav ? (
                <Grow in={isFav} timeout={250}>
                  <FavoriteIcon
                    fontSize="inherit"
                    sx={{ color: "primary.main", fontWeight: 500 }}
                  />
                </Grow>
              ) : (
                <FavoriteBorderOutlinedIcon
                  fontSize="inherit"
                  sx={{ color: "primary.main" }}
                />
              )}
            </IconButton>
          </CardActions>
        </Card>
      </a>
    </Link>
  );
};

export default ItemCard;
