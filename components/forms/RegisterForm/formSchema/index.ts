import * as Yup from "yup";
import dayjs from "dayjs";

export interface FormValues {
  email: string;
  password: string;
  dateOfBirth: Date;
}

export const initialValues: FormValues = {
  email: "",
  password: "",
  dateOfBirth: new Date(),
};
export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email address."),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  dateOfBirth: Yup.date()
    .max(
      dayjs(new Date()).subtract(13, "years").toDate(),
      "Age should be at least 13 years old"
    )
    .required("This field is required"),
});
