import { styled } from "@mui/material/";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import { ModalStateProps } from "../Modals/AddressModal";
import { useForm, SubmitHandler } from "react-hook-form";
import { addressSchema } from "~/utils/validation/formAddress";
import { yupResolver } from "@hookform/resolvers/yup";
import { Address } from "~/components/CheckoutPages/AddressPage";

const AddressForm = ({
  setOpen,
  addressList,
  setAddressList,
  setSelected,
}: ModalStateProps) => {
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Address>({
    resolver: yupResolver(addressSchema),
    reValidateMode: "onSubmit",
  });

  const getRandomId = () => {
    return Math.floor(Math.random() * 10);
  };

  const onSubmit: SubmitHandler<Address> = (data: Address) => {
    const randomId = getRandomId();
    setAddressList([...addressList, { ...data, id: randomId }]);
    setSelected(data);
    handleClose();
  };

  const Form = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: theme.palette.neutral?.light,
  }));

  return (
    <Form component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        type="text"
        label="Name this address"
        variant="standard"
        defaultValue="My address"
        {...register("addressName")}
        sx={{ marginBottom: 2 }}
        helperText={errors.addressName && errors.addressName.message}
      />
      <TextField
        type="text"
        label="First Name"
        {...register("firstName")}
        helperText={errors.firstName && errors.firstName.message}
        required
      />
      <TextField
        type="text"
        label="Last Name"
        {...register("lastName")}
        helperText={errors.lastName && errors.lastName.message}
        required
      />
      <TextField
        type="tel"
        label="Phone number"
        {...register("phoneNumber")}
        helperText={errors.phoneNumber && errors.phoneNumber.message}
        required
      />
      <TextField
        type="text"
        label="Street Address Line 1"
        {...register("firstAddressLine")}
        helperText={errors.firstAddressLine && errors.firstAddressLine.message}
        required
      />
      <TextField
        type="text"
        label="Street Address Line 2"
        {...register("secondAddressLine")}
        helperText={
          errors.secondAddressLine && errors.secondAddressLine.message
        }
      />
      <TextField
        type="text"
        label="City"
        {...register("city")}
        helperText={errors.city && errors.city.message}
        required
      />
      <TextField
        type="text"
        label="State / Province"
        {...register("province")}
        helperText={errors.province && errors.province.message}
        required
      />
      <TextField
        type="text"
        label="Postal / Zip Code"
        {...register("postalCode")}
        helperText={errors.postalCode && errors.postalCode.message}
        required
      />
      <TextField
        type="text"
        label="Country"
        {...register("country")}
        helperText={errors.country && errors.country.message}
        required
      />
      <FormGroup
        sx={{
          width: 1,
          marginTop: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: 1,
        }}
      >
        <Button onClick={() => handleClose()}>Cancel</Button>
        <Button type="submit">Save</Button>
      </FormGroup>
    </Form>
  );
};

export default AddressForm;
