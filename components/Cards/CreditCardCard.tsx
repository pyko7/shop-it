import { useEffect, useState } from "react";
import Image from "next/image";
import { styled } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CreditCard } from "../CheckoutPages/PaymentPage";
import paytabsLogo from "~/public/paytabs.png";
import { ModalStateProps } from "../Modals/PaymentModal";

interface CreditCardProps extends ModalStateProps {
  /** data that will be displayed in cards   */
  creditCardData: CreditCard;
  creditCardList: CreditCard[];
  setCreditCardList: (creditCardList: CreditCard[]) => void;
  selected: CreditCard | null;
  setSelected: (selected: CreditCard | null) => void;
  /** state used to display "next" button
   * if true the button is visible
   */
  selectedCreditCard: boolean;
  /** A callback that handles the state of "next" button */
  setSelectedCreditCard: (selectedCreditCard: boolean) => void;
}

const CreditCardCard = ({
  creditCardData,
  creditCardList,
  setCreditCardList,
  selected,
  setSelected,
  setSelectedCreditCard,
}: CreditCardProps) => {
  const [isCreditCardSelected, setIsCreditCardSelected] = useState(false);

  const handleClick = () => {
    setSelected(creditCardData);
  };

  const handleDelete = () => {
    setCreditCardList(
      creditCardList.filter((card: CreditCard) => card.id !== creditCardData.id)
    );
    setSelected(null);
    setSelectedCreditCard(false);
  };

  const CreditCardCard = styled(Card)(({ theme }) => ({
    position: "relative",
    width: "100%",
    maxWidth: 350,
    padding: 8,
    border: isCreditCardSelected
      ? `2px solid ${theme.palette.primary.main}`
      : `2px solid transparent`,
    overflow: "visible",
  }));

  const CreditCardActionArea = styled(CardActionArea)(
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
  const CardDescription = styled(Typography)({
    padding: 0,
    marginTop: 8,
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
      if (selected?.id === creditCardData.id) {
        setIsCreditCardSelected(true);
        setSelectedCreditCard(true);
      } else {
        setIsCreditCardSelected(false);
      }
    };
    handleSelected();
  });

  return (
    <CreditCardCard>
      <CreditCardActionArea onClick={() => handleClick()}>
        {isCreditCardSelected ? (
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
          avatar={<CreditCardIcon color="primary" />}
          action={
            <IconButton onClick={() => handleDelete()}>
              <DeleteIcon aria-label="delete address" />
            </IconButton>
          }
          title={<Typography sx={{ fontWeight: 700 }}>Credit Card</Typography>}
          sx={{ padding: 0 }}
        />
        <CardContent
          sx={{
            paddingY: 1,
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          <UserInformation> {creditCardData.cardOwner} </UserInformation>
          <UserInformation>{creditCardData.cardNumber} </UserInformation>
          <UserInformation>{`Expiry: ${creditCardData.expirationMonth} / ${creditCardData.expirationYear}`}</UserInformation>

          <CardDescription sx={{ display: "flex" }}>
            Secure checkout powered by
            <Box component="span" sx={{ marginX: 1 }}>
              <Image
                loader={() => `${paytabsLogo}`}
                unoptimized={true}
                src={paytabsLogo}
                width={75}
                height={25}
                alt="paytabs"
              />
            </Box>
          </CardDescription>
        </CardContent>
      </CreditCardActionArea>
    </CreditCardCard>
  );
};

export default CreditCardCard;
