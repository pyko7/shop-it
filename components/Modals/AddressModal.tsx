import AddressForm from "../Forms/AddressForm";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Address } from "../CheckoutPages/AddressPage";

/**
 * Wrapper for the address page modal and it's children
 */
export interface ModalStateProps {
  /** State of the modal */
  open?: boolean;

  /** Function that handles the modal's state */
  setOpen: (open: boolean) => void;

  /**Array of addresses*/
  addressList: Address[];

  /** A callback that handles the array of addresses */
  setAddressList: (addressList: Address[]) => void;

  /** informs user if this is the delivery address choosen*/
  selected?: Address | null;

  /**A callback that handles the address selected by the user to be delivered*/
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
