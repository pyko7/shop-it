import AddressForm from "../Forms/AddressForm";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Address } from "../CheckoutPages/AddressPage";

export interface ModalStateProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
  addressList: Address[];
  setAddressList: (addressList: Address[]) => void;
  selected?: Address | null;
  setSelected: (selected: Address | null) => void;
}

const AddressModal = ({
  open,
  setOpen,
  addressList,
  setAddressList,
  setSelected,
}: ModalStateProps) => {
  const handleClose = () => setOpen(false);
  const stateProps = {
    open,
    setOpen,
    addressList,
    setAddressList,
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
        <AddressForm {...stateProps} />
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
