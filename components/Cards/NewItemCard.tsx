import { Card, CardContent, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { maxWidth } from "@mui/system";

const NewItemCard = () => {
  return (
    <Card sx={{ width: "100%", maxWidth: 280, height: 170 }}>
      <CardContent
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: 0.5,
        }}
      >
        <Typography variant="h3" sx={{ fontSize: 16 }}>
          Printed shirt in cotton
        </Typography>
        <Typography sx={{ fontSize: 14 }}>by Big Brand</Typography>
      </CardContent>
    </Card>
  );
};

export default NewItemCard;
