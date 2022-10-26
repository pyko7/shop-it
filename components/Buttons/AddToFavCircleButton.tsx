import { FC } from "react";
import { useFavoriteProductsList } from "~/context/FavoriteProductsContext";
import { StateProps } from "../Cards/ProductCard";
import { useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavCircleButton: FC<StateProps> = ({
  isFav,
  productId,
}): JSX.Element => {
  const { handleFavorite } = useFavoriteProductsList();
  const theme = useTheme();

  return (
    <IconButton
      sx={{
        borderRadius: "50%",
        border: isFav
          ? `2px solid ${theme.palette.primary.light}`
          : "2px solid #afafaf",
      }}
      onClick={(event) => {
        handleFavorite(event, productId);
      }}
    >
      <FavoriteIcon color={isFav ? "primary" : "inherit"} />
    </IconButton>
  );
};

export default AddToFavCircleButton;
