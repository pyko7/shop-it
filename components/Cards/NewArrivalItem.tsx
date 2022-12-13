import { FC, useState, useEffect } from "react";
import { useFavoriteProductsList } from "~/context/FavoriteProductsContext";
import Image from "next/image";
import Link from "next/link";
import { Product } from "~/utils/fetchProducts/getAllProducts";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export interface ProductProps {
  product: Product;
}

const NewArrivalItem: FC<ProductProps> = ({ product }): JSX.Element => {
  const { handleFavorite, handleFavoriteIcon } = useFavoriteProductsList();
  let favoriteList = handleFavoriteIcon(product?.id);
  const [isFav, setIsFav] = useState<boolean>(false);

  const CardDescriptionContainer = styled("div")(({ theme }) => ({
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "50px",
    padding: "0 10px 0 10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 4,
    color: theme.palette.neutral?.light,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
  }));

  const CardTitle = styled(Typography)({
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    fontSize: 12,
    fontWeight: 500,
  });

  useEffect(() => {
    return favoriteList ? setIsFav(true) : setIsFav(false);
  }, [favoriteList]);

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
            height: 170,
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
              }}
            >
              <Box sx={{ position: "relative", width: 1, height: 1 }}>
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
              <CardDescriptionContainer>
                <CardTitle variant="h3">{product?.title}</CardTitle>
              </CardDescriptionContainer>
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
              onClick={(event) => handleFavorite(event, product?.id)}
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

export default NewArrivalItem;
