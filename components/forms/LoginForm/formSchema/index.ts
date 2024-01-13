import * as Yup from "yup";

export interface FormValues {
  email: string;
  password: string;
}

export const initialValues: FormValues = {
  email: "",
  password: "",
};
export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email address."),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});
