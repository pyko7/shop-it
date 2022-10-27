import { styled } from "@mui/material/";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import { ModalStateProps } from "../Modals/AddressModal";
import { useForm, SubmitHandler } from "react-hook-form";
import { addressSchema } from "~/utils/validation/formAddress";
import { yupResolver } from "@hookform/resolvers/yup";
import { Address } from "~/components/CheckoutPages/AddressPage";

const AddressForm = ({
  setOpen,
  addressList,
  setAddressList,
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

  const getRandomId = (): number => {
    return Math.floor(Math.random() * 10);
  };

  /**
   * This function create the address object
   * @param data - data entered by the user in the form
   */
  const onSubmit: SubmitHandler<Address> = (data: Address) => {
    const randomId = getRandomId();
    setAddressList([...addressList, { ...data, id: randomId }]);
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

  const ErrorMessage = styled(FormHelperText)(({ theme }) => ({
    width: "100%",
    marginLeft: 2,
    color: theme.palette.error.main,
  }));

  return (
    <Form component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <TextField
          type="text"
          label="Name this address"
          variant="standard"
          defaultValue="My address"
          {...register("addressName")}
          error={errors.addressName ? true : false}
          sx={{ marginBottom: 2 }}
        />
        <ErrorMessage>
          {errors.addressName ? errors.addressName.message : ""}
        </ErrorMessage>
      </FormGroup>

      <FormGroup>
        <TextField
          type="text"
          label="First Name"
          {...register("firstName")}
          error={errors.firstName ? true : false}
          required
        />
        <ErrorMessage>
          {errors.firstName ? errors.firstName.message : ""}
        </ErrorMessage>
      </FormGroup>
      <FormGroup>
        <TextField
          type="text"
          label="Last Name"
          {...register("lastName")}
          error={errors.lastName ? true : false}
          required
        />
        <ErrorMessage>
          {errors.lastName ? errors.lastName.message : ""}
        </ErrorMessage>
      </FormGroup>
      <FormGroup>
        <TextField
          type="tel"
          label="Phone number"
          {...register("phoneNumber")}
          error={errors.phoneNumber ? true : false}
          required
        />
        <ErrorMessage>
          {errors.phoneNumber ? errors.phoneNumber.message : ""}
        </ErrorMessage>
      </FormGroup>
      <FormGroup>
        <TextField
          type="text"
          label="Street Address Line 1"
          {...register("firstAddressLine")}
          error={errors.firstAddressLine ? true : false}
          required
        />
        <ErrorMessage>
          {errors.firstAddressLine ? errors.firstAddressLine.message : ""}
        </ErrorMessage>
      </FormGroup>
      <FormGroup>
        <TextField
          type="text"
          label="Street Address Line 2"
          {...register("secondAddressLine")}
          error={errors.secondAddressLine ? true : false}
        />
        <ErrorMessage>
          {errors.secondAddressLine ? errors.secondAddressLine.message : ""}
        </ErrorMessage>
      </FormGroup>

      <FormGroup>
        <TextField
          type="text"
          label="City"
          {...register("city")}
          error={errors.city ? true : false}
          required
        />
        <ErrorMessage> {errors.city ? errors.city.message : ""}</ErrorMessage>
      </FormGroup>

      <FormGroup>
        <TextField
          type="text"
          label="State / Province"
          {...register("province")}
          error={errors.province ? true : false}
          required
        />
        <ErrorMessage>
          {errors.province ? errors.province.message : ""}
        </ErrorMessage>
      </FormGroup>

      <FormGroup>
        <TextField
          type="text"
          label="Postal / Zip Code"
          {...register("postalCode")}
          error={errors.postalCode ? true : false}
          required
        />
        <ErrorMessage>
          {errors.postalCode ? errors.postalCode.message : ""}
        </ErrorMessage>
      </FormGroup>

      <FormGroup>
        <TextField
          type="text"
          label="Country"
          {...register("country")}
          error={errors.country ? true : false}
          required
        />
        <ErrorMessage>
          {errors.country ? errors.country.message : ""}
        </ErrorMessage>
      </FormGroup>

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
