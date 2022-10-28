import { useState } from "react";
import { useTheme, useMediaQuery, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { StepStateProps } from "./AddressPage";
import CreditCardCard from "../Cards/CreditCardCard";
import PaymentModal from "../Modals/PaymentModal";

export interface CreditCard {
  id: number;
  cardOwner: string;
  cardNumber: string;
  expirationMonth: number;
  expirationYear: number;
  ccvNumber: string;
}

const PaymentPage = ({ activeStep, setActiveStep }: StepStateProps) => {
  const [open, setOpen] = useState(false);
  const [creditCardList, setCreditCardList] = useState<CreditCard[]>([]);
  const [selected, setSelected] = useState<CreditCard | null>(null);
  const [selectedCreditCard, setSelectedCreditCard] = useState(false);

  const theme = useTheme();
  const isBiggerThanMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const isBiggerThanTablet = useMediaQuery(theme.breakpoints.up("md"));

  const stateProps = {
    open,
    setOpen,
    creditCardList,
    setCreditCardList,
    selected,
    setSelected,
    selectedCreditCard,
    setSelectedCreditCard,
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    localStorage.removeItem("cart");
  };

  const SectionTitle = styled(Typography)({
    margin: "20px 0",
    fontWeight: 500,
    fontSize: isBiggerThanMobile ? 18 : 16,
  });
  return (
    <Box
      sx={{ position: "relative", width: 1, maxWidth: 800, margin: "0 auto" }}
    >
      <Box>
        <SectionTitle variant="h2">Select a payment method</SectionTitle>
        <Box
          sx={{ width: 1, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            color="inherit"
            sx={{
              width: 1,
              maxWidth: 250,
              paddingY: 1,
            }}
            onClick={() => setOpen(true)}
          >
            Add a new credit card
          </Button>
          {!open ? null : <PaymentModal {...stateProps} />}

          <Box
            sx={{
              width: 1,
              display: "flex",
              flexDirection: isBiggerThanTablet ? "row" : "column",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {creditCardList.map((card) => (
              <CreditCardCard
                creditCardData={card}
                {...stateProps}
                key={card.id}
              />
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: 1,
          marginY: 4,
          marginX: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="outlined"
          sx={{ fontWeight: 500 }}
          onClick={() => handleBack()}
        >
          Back
        </Button>
        {!selectedCreditCard ? null : (
          <Button variant="contained" onClick={() => handleNext()}>
            Confirm Payment
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default PaymentPage;
