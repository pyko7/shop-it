import * as yup from "yup";

export const creditCardSchema = yup.object({
  cardOwner: yup
    .string()
    .min(2, "must be at least 2 characters long")
    .matches(/^([A-Za-z]+[-'\s]?){2,}$/, {
      message: "only letters and - ' are allowed",
      excludeEmptyString: true,
    })
    .required("must be at least 2 characters long"),
  cardNumber: yup
    .string()
    .min(16)
    .max(16)
    .matches(
      /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
      {
        message: "only digits are allowed",
        excludeEmptyString: true,
      }
    )
    .required("must fill this input"),
  expirationMonth: yup
    .number()
    .typeError("must fill this input")
    .min(1)
    .max(12)
    .positive("must fill this input")
    .integer("must fill this input")
    .required("must fill this input"),
  expirationYear: yup
    .number()
    .typeError("must fill this input")
    .min(new Date().getFullYear())
    .max(new Date().getFullYear() + 10)
    .positive("must fill this input")
    .integer("must fill this input")
    .required("must fill this input"),
  ccvNumber: yup
    .string()
    .min(3, "must fill this input")
    .max(3, "must fill this input")
    .matches(/^\d{1,3}$/, {
      message: "only digits are allowed",
      excludeEmptyString: true,
    })
    .required("must fill this input"),
});
