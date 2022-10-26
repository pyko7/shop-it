import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddressPage from "~/components/CheckoutPages/AddressPage";
import CheckoutStepper from "~/components/Navigation/CheckoutStepper";
import PaymentPage from "~/components/CheckoutPages/PaymentPage";
import PlacedOrderPage from "~/components/CheckoutPages/PlacedOrderPage";

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepState = { activeStep, setActiveStep };

  return (
    <Box
      component="section"
      sx={{
        position: "absolute",
        top: 0,
        width: 1,
        padding: 2.5,
        backgroundColor: "neutral.light",
        zIndex: 1101,
      }}
    >
      <Box
        sx={{
          width: 1,
          maxWidth: 800,
          marginY: 0,
          marginX: "auto",
        }}
      >
        <Box sx={{ marginY: 2, textAlign: "center" }}>
          <Typography variant="h1" sx={{ fontSize: 20, fontWeight: 500 }}>
            Checkout
          </Typography>
        </Box>
        <CheckoutStepper activeStep={activeStep} />
        <Box
          sx={{
            position: "absolute",
            left: 0,
            width: "100%",
            minHeight: "100vh",
            padding: 2.5,
            backgroundColor: "white",
          }}
        >
          {activeStep === 0 ? (
            <AddressPage {...stepState} />
          ) : activeStep === 1 ? (
            <PaymentPage {...stepState} />
          ) : activeStep === 2 ? (
            <PlacedOrderPage />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
