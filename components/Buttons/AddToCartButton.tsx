import { FC } from "react";
import Button from "@mui/material/Button";
import { useMediaQuery, useTheme } from "@mui/material";

interface AddToCartButtonProps {
  label: string;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({ label }): JSX.Element => {
  const theme = useTheme();
  const isBiggerThanMobile = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{ maxWidth: isBiggerThanMobile ? 250 : 450, paddingY: 1.25 }}
    >
      {label}
    </Button>
  );
};

export default AddToCartButton;
