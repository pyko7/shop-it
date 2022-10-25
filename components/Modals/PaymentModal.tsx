import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { CreditCard } from "../CheckoutPages/PaymentPage";
import CreditCardForm from "../Forms/CreditCardForm";

export interface ModalStateProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
  creditCardList: CreditCard[];
  setCreditCardList: (creditCardList: CreditCard[]) => void;
  selected?: CreditCard | null;
  setSelected: (selected: CreditCard | null) => void;
}

const PaymentModal = ({
  open,
  setOpen,
  creditCardList,
  setCreditCardList,
  setSelected,
}: ModalStateProps) => {
  const handleClose = () => setOpen(false);
  const stateProps = {
    open,
    setOpen,
    creditCardList,
    setCreditCardList,
    setSelected,
  };
  return (
    <Dialog
      open={open!}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogContent>
        <CreditCardForm {...stateProps} />
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
