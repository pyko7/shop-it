import { useState } from "react";
import { useTheme, useMediaQuery, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddressCard from "~/components/Cards/AddressCard";
import AddressModal from "~/components/Modals/AddressModal";

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

export interface StepStateProps {
  activeStep: number;
  setActiveStep: (activeStep: number) => void;
}

const AddressPage = ({ activeStep, setActiveStep }: StepStateProps) => {
  const [open, setOpen] = useState(false);
  const [addressList, setAddressList] = useState<Address[]>([]);
  const [selected, setSelected] = useState<Address | null>(null);
  const [selectedAddress, setSelectedAddress] = useState(false);
  const stateProps = {
    open,
    setOpen,
    addressList,
    setAddressList,
    selected,
    setSelected,
    selectedAddress,
    setSelectedAddress,
  };
  const theme = useTheme();
  const isBiggerThanMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const isBiggerThanTablet = useMediaQuery(theme.breakpoints.up("md"));

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const SectionTitle = styled(Typography)({
    margin: "20px 0",
    fontWeight: 500,
    fontSize: isBiggerThanMobile ? 18 : 16,
  });

  return (
    <>
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
          {!open ? null : <AddressModal {...stateProps} />}

          <Box
            sx={{
              width: 1,
              display: "flex",
              alignItems: "center",
              flexDirection: isBiggerThanTablet ? "row" : "column",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {addressList.map((add) => (
              <AddressCard addressData={add} {...stateProps} key={add.id} />
            ))}
          </Box>
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
        {!selectedAddress ? null : (
          <Button variant="contained" onClick={() => handleNext()}>
            Next
          </Button>
        )}
      </Box>
    </>
  );
};

export default AddressPage;