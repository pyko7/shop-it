import { useEffect, useState } from "react";
import { styled } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import HomeIcon from "@mui/icons-material/Home";
import { Address } from "~/components/CheckoutPages/AddressPage";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface AddressProps {
  addressData: Address;
  addressList: Address[];
  setAddressList: (addressList: Address[]) => void;
  selected: Address | null;
  setSelected: (selected: Address | null) => void;
  selectedAddress: boolean;
  setSelectedAddress: (selectedAddress: boolean) => void;
}

const AddressCard = ({
  addressData,
  addressList,
  setAddressList,
  selected,
  setSelected,
  setSelectedAddress,
}: AddressProps) => {
  const [isAddressSelected, setIsAddressSelected] = useState(false);

  const addressDescription = [
    addressData.firstAddressLine,
    addressData.secondAddressLine,
    addressData.city,
    addressData.province,
    addressData.postalCode,
    addressData.country,
  ];

  const handleClick = () => {
    setSelected(addressData);
  };

  const handleDelete = () => {
    setAddressList(
      addressList.filter((address: Address) => address.id !== addressData.id)
    );
    setSelected(null);
    setSelectedAddress(false);
  };

  const AddressCard = styled(Card)(({ theme }) => ({
    position: "relative",
    width: "100%",
    maxWidth: 350,
    padding: 8,
    border: isAddressSelected
      ? `2px solid ${theme.palette.primary.main}`
      : `2px solid transparent`,
    overflow: "visible",
  }));

  const AddressCardActionArea = styled(CardActionArea)(
    ({ theme }) => `
    .MuiCardActionArea-focusHighlight {
        background: transparent;
    }
`
  );

  const UserInformation = styled(Typography)({
    fontWeight: 500,
    fontSize: 16,
  });
  const AddressDescription = styled(Typography)({
    padding: 0,
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.6)",
    "&::after": {
      content: '" - "',
    },
    "&:last-child::after": {
      content: '""',
    },
  });

  useEffect(() => {
    const handleSelected = () => {
      if (selected?.id === addressData.id) {
        setIsAddressSelected(true);
        setSelectedAddress(true);
      } else {
        setIsAddressSelected(false);
      }
    };
    handleSelected();
  }, [selected]);

  return (
    <AddressCard>
      <AddressCardActionArea onClick={() => handleClick()}>
        {isAddressSelected ? (
          <CheckCircleIcon
            sx={{
              position: "absolute",
              top: -20,
              right: -20,
              zIndex: 10,
              backgroundColor: "white",
            }}
            fontSize="medium"
            color="primary"
          />
        ) : null}
        <CardHeader
          avatar={<HomeIcon color="primary" />}
          action={
            <IconButton onClick={() => handleDelete()}>
              <DeleteIcon aria-label="delete address" />
            </IconButton>
          }
          title={
            <Typography sx={{ fontWeight: 700 }}>
              {addressData.addressName}
            </Typography>
          }
          sx={{ padding: 0 }}
        />
        <CardContent
          sx={{ display: "flex", flexDirection: "column", rowGap: 2.5 }}
        >
          <Box>
            <UserInformation>
              {addressData.firstName} {addressData.lastName}
            </UserInformation>
            <UserInformation>{addressData.phoneNumber}</UserInformation>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 1 }}>
            {addressDescription.map((info) => {
              if (info) return <AddressDescription>{info}</AddressDescription>;
            })}
          </Box>
        </CardContent>
      </AddressCardActionArea>
    </AddressCard>
  );
};

export default AddressCard;
