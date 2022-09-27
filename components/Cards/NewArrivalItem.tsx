import { FC, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../utils/fetchProducts/getProductsById";
import { Product } from "../../utils/fetchProducts/getAllProducts";
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

interface ProductProps {
  product: Product;
}

const NewArrivalItem: FC<ProductProps> = ({ product }): JSX.Element => {
  const [isLiked, setIsLiked] = useState(false);
  const [animation, setAnimation] = useState(false);
  const id: number = product.id;

  const { isLoading, error, data } = useQuery(["newArrival"], () =>
    getProductById(id)
  );

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setAnimation(false);
    } else {
      setAnimation(true);
      setIsLiked(true);
    }
  };

  return (
    <Card
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
              src={product?.thumbnail!}
              alt={product?.title}
              layout="fill"
              objectFit="cover"
              objectPosition="50% 50%"
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: 1,
              height: 75,
              padding: "0 10px 0 10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 0.5,
              color: "neutral.light",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {product?.title}
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
              }}
            >
              {product?.description}
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
        <IconButton sx={{ width: 14, height: 14 }} onClick={() => handleLike()}>
          {isLiked ? (
            <Grow in={animation} timeout={250}>
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
  );
};

export default NewArrivalItem;