import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { CreditCard } from "../CheckoutPages/PaymentPage";
import CreditCardForm from "../Forms/CreditCardForm";

/**
 * Wrapper for the address page modal and it's children
 */
export interface ModalStateProps {
  /** State of the modal */
  open?: boolean;

  /** Function that handles the modal's state */
  setOpen: (open: boolean) => void;

  /**Array of credit cards*/
  creditCardList: CreditCard[];

  /** A callback that handles the array of credit cards */
  setCreditCardList: (creditCardList: CreditCard[]) => void;

  /** informs user if this is the choosen credit card */
  selected?: CreditCard | null;
  /**A callback that handles the credit card selected by the user*/
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
