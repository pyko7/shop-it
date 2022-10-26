import { FC, useState } from "react";
import { Product } from "~/utils/fetchProducts/getAllProducts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface AccordionProps {
  label: string;
  product: Product | null;
}

const TogglableAccordionPannel: FC<AccordionProps> = ({
  label,
  product,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const handlePannelDisplay = (): void => {
    return isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <Box sx={{ width: 1, borderBottom: "1px solid #afafaf" }}>
      <Button
        variant="text"
        color="inherit"
        endIcon={isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        sx={{
          width: 1,
          paddingX: 0,
          paddingY: 0.5,
          display: "flex",
          justifyContent: "space-between",
          fontWeight: 500,
        }}
        onClick={() => handlePannelDisplay()}
      >
        {label}
      </Button>
      {!isOpen ? null : (
        <Box sx={{ width: 1, marginTop: 2 }}>
          <Typography paragraph sx={{ fontSize: 14 }}>
            {product?.description}
          </Typography>
        </Box>
      )}
      {isOpen && label.includes("reviews") ? (
        <Box sx={{ width: 1, marginTop: 2 }}>
          <Typography paragraph sx={{ fontSize: 14 }}>
            There aren&apos;t reviews for this product yet
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};

export default TogglableAccordionPannel;
