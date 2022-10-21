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
import { Address } from "../../pages/checkout";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface AddressProps {
  addressData: Address;
  address: Address[];
  setAddress: (address: Address[]) => void;
  selected: boolean;
  setIsSelected: (selected: boolean) => void;
}

const AddressCard = ({
  addressData,
  address,
  setAddress,
  selected,
  setIsSelected,
}: AddressProps) => {
  const addressDescription = [
    addressData.firstAddressLine,
    addressData.secondAddressLine,
    addressData.city,
    addressData.province,
    addressData.postalCode,
    addressData.country,
  ];

  const handleSelection = () => {
    return selected ? setIsSelected(false) : setIsSelected(true);
  };

  const handleDelete = () => {
    setAddress(address.filter((address) => address.id !== address.id));
  };

  const AddressCard = styled(Card)(({ theme }) => ({
    position: "relative",
    width: "100%",
    maxWidth: 350,
    padding: 8,
    border: selected
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

  return (
    <AddressCard>
      <AddressCardActionArea onClick={() => handleSelection()}>
        {selected ? (
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
            <UserInformation sx={{ fontWeight: 500 }}>
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
