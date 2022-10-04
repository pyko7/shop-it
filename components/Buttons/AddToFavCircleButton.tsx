import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavCircleButton = () => {
  return (
    <IconButton sx={{ borderRadius: "50%", border: "2px solid #afafaf" }}>
      <FavoriteIcon />
    </IconButton>
  );
};

export default AddToFavCircleButton;
