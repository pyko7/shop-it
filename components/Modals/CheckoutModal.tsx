import AddressForm from "../Forms/AddressForm";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Address } from "../../pages/checkout";

export interface ModalStateProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
  address: Address[];
  setAddress: (address: Address[]) => void;
}

const CheckoutModal = ({
  open,
  setOpen,
  address,
  setAddress,
}: ModalStateProps) => {
  const handleClose = () => setOpen(false);
  const stateProps = {
    open: open,
    setOpen: setOpen,
    address: address,
    setAddress: setAddress,
  };
  return (
    <Dialog
      open={open!}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogContent>
        <AddressForm {...stateProps} />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
