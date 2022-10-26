import { FC, useState } from "react";
import { Product } from "~/utils/fetchProducts/getAllProducts";
import { styled } from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

interface AccordionItemProps {
  label: string;
  product: Product | null;
}

const TogglableAccordionPannel: FC<AccordionItemProps> = ({
  label,
  product,
}): JSX.Element => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Accordion
      expanded={expanded === `${label}`}
      onChange={handleChange(`${label}`)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={label}
        id={label}
      >
        <Typography>{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {label.includes("reviews") ? (
          <Typography paragraph sx={{ fontSize: 14 }}>
            There aren&apos;t reviews for this product yet
          </Typography>
        ) : label.includes("Free") ? (
          <Typography paragraph sx={{ fontSize: 14 }}>
            It's free, enjoy it !
          </Typography>
        ) : (
          <Typography paragraph sx={{ fontSize: 14 }}>
            {product?.description}
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default TogglableAccordionPannel;
