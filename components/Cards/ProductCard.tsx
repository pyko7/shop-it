import { FC, useState, useEffect } from "react";
import { ProductProps } from "./NewArrivalItem";
import Image from "next/image";
import { useFavoriteProductsList } from "../../context/FavoriteProductsContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import Carousel from "react-material-ui-carousel";
import StarIcon from "@mui/icons-material/Star";
import TogglableAccordionPannel from "./TogglableAccordionPannel";
import AddToCartButton from "../Buttons/AddToCartButton";
import { useMediaQuery, useTheme, styled } from "@mui/material";
import AddToFavCircleButton from "../Buttons/AddToFavCircleButton";

export interface StateProps {
  isFav: boolean;
  productId: number;
}

/*Page of a single item*/
const ProductCard: FC<ProductProps> = ({ product }): JSX.Element => {
  const { handleFavoriteIcon } = useFavoriteProductsList();
  let favoriteList = handleFavoriteIcon(product?.id);
  const [isFav, setIsFav] = useState<boolean>(false);
  const productId = product.id;
  const favoriteState: StateProps = { isFav, productId };

  const theme = useTheme();
  const isDesktopView = useMediaQuery(theme.breakpoints.up("md"));

  const ButtonsContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "24px",
    [theme.breakpoints.up("sm")]: {
      justifyContent: "flex-end",
    },
    [theme.breakpoints.up("md")]: {
      justifyContent: "space-between",
    },
  }));

  useEffect(() => {
    return favoriteList ? setIsFav(true) : setIsFav(false);
  }, [favoriteList]);

  return (
    <Box
      sx={{
        width: 1,
        display: isDesktopView ? "flex" : "block",
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 4,
      }}
    >
      <Carousel
        autoPlay={false}
        activeIndicatorIconButtonProps={{
          style: {
            width: 24,
          },
        }}
        navButtonsAlwaysVisible={isDesktopView ? true : false}
        sx={{
          width: isDesktopView ? "50%" : 1,
        }}
      >
        {product?.images.map((product) => (
          <Box
            sx={{
              position: "relative",
              width: 1,
              height: 350,
            }}
            key={product}
          >
            <Image
              src={product}
              alt="product visual"
              layout="fill"
              objectFit="contain"
              objectPosition="50% 50%"
            />
          </Box>
        ))}
      </Carousel>

      <Box
        sx={{
          width: isDesktopView ? "50%" : 1,
          maxWidth: isDesktopView ? 525 : "none",
          paddingY: 1.25,
          paddingRight: isDesktopView ? 1.5 : 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ color: "#afafaf", fontSize: 14 }}>
            {product.category}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Icon fontSize="small" color="primary">
              <StarIcon sx={{ width: 1, height: 1 }} />
            </Icon>
            <Typography sx={{ color: "#afafaf", fontSize: 14 }}>
              ({product.rating})
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h1" sx={{ fontSize: 24, fontWeight: 700 }}>
            {product.title}
          </Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 500 }}>
            ${product.price}
          </Typography>
        </Box>
        <Box
          sx={{
            marginBottom: 2.5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TogglableAccordionPannel label={"Description"} product={product} />
          <TogglableAccordionPannel
            label={"Free Delivery and Returns"}
            product={null}
          />
          <TogglableAccordionPannel label={"See reviews"} product={null} />
        </Box>

        <ButtonsContainer>
          <AddToFavCircleButton {...favoriteState} />
          <AddToCartButton label="Add to Cart" />
        </ButtonsContainer>
      </Box>
    </Box>
  );
};

export default ProductCard;
