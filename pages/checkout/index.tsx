import { useState } from "react";
import { useTheme, useMediaQuery, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckoutStepper from "../../components/Navigation/CheckoutStepper";
import AddressCard from "../../components/Cards/AddressCard";
import CheckoutModal from "../../components/Modals/CheckoutModal";

export interface Address {
  id: number;
  addressName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  firstAddressLine: string;
  secondAddressLine?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

const CheckoutPage = () => {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState<Address[]>([]);
  const [selected, setIsSelected] = useState(false);

  const stateProps = {
    open: open,
    setOpen: setOpen,
    address: address,
    setAddress: setAddress,
  };

  console.log(address);
  const theme = useTheme();
  const isBiggerThanMobile = useMediaQuery(theme.breakpoints.up("sm"));

  const SectionTitle = styled(Typography)({
    margin: "20px 0",
    fontWeight: 500,
    fontSize: isBiggerThanMobile ? 18 : 16,
  });

  return (
    <Box
      component="section"
      sx={{
        position: "absolute",
        inset: 0,
        width: "100%",
        minHeight: "100vh",
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

        <CheckoutStepper />

        <Box>
          <SectionTitle variant="h2">Select delivery address</SectionTitle>
          <Box
            sx={{ width: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              color="inherit"
              sx={{
                width: 1,
                maxWidth: isBiggerThanMobile ? 250 : "none",
                paddingY: 1,
              }}
              onClick={() => setOpen(true)}
            >
              Add new address
            </Button>
            {!open ? null : <CheckoutModal {...stateProps} />}
            {address.map((add) => (
              <AddressCard
                addressData={add}
                address={address}
                setAddress={setAddress}
                selected={selected}
                setIsSelected={setIsSelected}
                key={add.id}
              />
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            position: "fixed",
            left: 0,
            bottom: 25,
            width: 1,
            paddingX: 2,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {!selected ? null : <Button variant="contained">Next</Button>}
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
