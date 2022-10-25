import { useState } from "react";
import { styled } from "@mui/material/";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ModalStateProps } from "../Modals/PaymentModal";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { creditCardSchema } from "~/utils/validation/formCreditCard";
import { CreditCard } from "../CheckoutPages/PaymentPage";
import FormHelperText from "@mui/material/FormHelperText";

const CreditCardForm = ({
  setOpen,
  creditCardList,
  setCreditCardList,
  setSelected,
}: ModalStateProps) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const months = [...Array(12 + 1).keys()].slice(1);
  const years = [...Array(currentYear + 11).keys()].slice(currentYear);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<CreditCard>({
    resolver: yupResolver(creditCardSchema),
    reValidateMode: "onSubmit",
  });

  const handleClose = () => setOpen(false);

  const handleMonthChange = (event: SelectChangeEvent) => {
    setMonth(event.target.value as string);
  };
  const handleYearChange = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };

  const getRandomId = () => {
    return Math.floor(Math.random() * 10);
  };

  const onSubmit: SubmitHandler<CreditCard> = (data: CreditCard) => {
    const randomId = getRandomId();
    if (parseInt(year) === currentYear && parseInt(month) < currentMonth) {
      setError("expirationMonth", {
        type: "custom",
        message: "please enter a valid date",
      });
    } else {
      clearErrors("expirationMonth");
      setCreditCardList([...creditCardList, { ...data, id: randomId }]);
      setSelected(data);
      handleClose();
    }
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

  const DateInputs = styled(FormGroup)(({ theme }) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  }));

  const ErrorMessage = styled(FormHelperText)(({ theme }) => ({
    width: "100%",
    margin: 0,
    color: theme.palette.error.main,
  }));

  return (
    <Form component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <TextField
          type="text"
          label="Owner"
          {...register("cardOwner")}
          required
        />
        {errors.cardOwner && (
          <ErrorMessage>{errors.cardOwner.message}</ErrorMessage>
        )}
      </FormGroup>
      <FormGroup>
        <TextField
          type="text"
          label="Card number"
          {...register("cardNumber")}
          inputProps={{ maxLength: 16 }}
          required
        />
        {errors.cardNumber && (
          <ErrorMessage>{errors.cardNumber.message}</ErrorMessage>
        )}
      </FormGroup>

      <DateInputs>
        <FormControl sx={{ width: "40%" }}>
          <InputLabel id="expiration-month">Month</InputLabel>
          <Select
            labelId="expiration-month"
            id="expiration-month-select"
            value={month}
            label="Month"
            {...register("expirationMonth", {
              onChange: (event) => {
                handleMonthChange(event);
              },
            })}
          >
            {months.map((month) => {
              return (
                <MenuItem value={month} key={month}>
                  {month}
                </MenuItem>
              );
            })}
          </Select>
          {errors.expirationMonth && (
            <ErrorMessage>{errors.expirationMonth.message}</ErrorMessage>
          )}
        </FormControl>
        <FormControl sx={{ width: "55%" }}>
          <InputLabel id="expiration-year">Year</InputLabel>
          <Select
            labelId="expiration-year"
            id="expiration-year-select"
            value={year}
            label="Year"
            {...register("expirationYear", {
              onChange: (event) => {
                handleYearChange(event);
              },
            })}
          >
            {years.map((year) => {
              return (
                <MenuItem value={year} key={year}>
                  {year}
                </MenuItem>
              );
            })}
          </Select>
          {errors.expirationYear && (
            <ErrorMessage>{errors.expirationYear.message}</ErrorMessage>
          )}
        </FormControl>
      </DateInputs>

      <FormGroup>
        <TextField
          type="text"
          label="CCV number"
          {...register("ccvNumber")}
          inputProps={{ maxLength: 3 }}
          required
        />
        {errors.ccvNumber && (
          <ErrorMessage>{errors.ccvNumber.message}</ErrorMessage>
        )}
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

export default CreditCardForm;
