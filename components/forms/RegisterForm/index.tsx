"use client";
import { useCallback, ChangeEvent } from "react";
import s from "./RegisterForm.module.scss";
import CustomInput from "@/components/CustomInput";
import Button from "@/components/Button";
import { useFormik } from "formik";
import { FormValues, initialValues, validationSchema } from "./formSchema";
import Datepicker from "@/components/Datepicker";
import dayjs from "dayjs";
import Link from "next/link";

const RegisterForm = () => {
  const formik = useFormik<FormValues>({
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (!formik.isValid) {
        formik.validateForm();
        formik.setTouched({
          email: true,
          password: true,
        });
        return;
      }
    },
  });

  const handleChange = useCallback(
    (key: keyof FormValues) => (e: string) => {
      formik.setFieldValue(key, e);
    },
    [formik]
  );

  const handleDateChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      formik.setFieldValue(
        "dateOfBirth",
        e.target.value ? new Date(e.target.value) : null
      );
    },
    [formik]
  );

  const handleBlur = useCallback(
    (key: keyof FormValues) => () => {
      formik.setFieldTouched(key, true);
    },
    [formik]
  );

  return (
    <div className={s.root}>
      <h2>Register Form</h2>
      <div className={s.fieldsWrapper}>
        <div>
          <CustomInput
            id="email"
            name="email"
            placeholder="Enter your email"
            type="email"
            defaultValue={formik.values.email}
            hasErrors={formik.touched.email && !!formik.errors.email}
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
          />
          <p className="text-[red] text-xs mt-2">{formik.errors.email}</p>
        </div>

        <div>
          <CustomInput
            id="password"
            name="password"
            placeholder="Enter your password"
            type="password"
            defaultValue={formik.values.password}
            hasErrors={formik.touched.password && !!formik.errors.password}
            onChange={handleChange("password")}
            onBlur={handleBlur("password")}
          />
          <p className="text-[red] text-xs mt-2">{formik.errors.password}</p>
        </div>
        <div>
          <Datepicker
            onChange={handleDateChange}
            onBlur={handleBlur("dateOfBirth")}
            value={dayjs(formik.values.dateOfBirth).format("YYYY-MM-DD")}
          >
            <CustomInput
              id="dateOfBirth"
              name="dateOfBirth"
              type="text"
              placeholder="Date of birth"
              value={dayjs(formik.values.dateOfBirth).format("MM/DD/YYYY")}
              hasErrors={
                formik.touched.dateOfBirth && !!formik.errors.dateOfBirth
              }
            />
          </Datepicker>
          <p className="text-[red] text-xs mt-2">
            {formik.errors.dateOfBirth as string}
          </p>
        </div>
      </div>

      <Button
        size="large"
        cssClasses="w-full rounded-full mt-8"
        disabled={!formik.isValid}
      >
        Register
      </Button>
      <Link href={"/account/login"}>
        <p className="text-[var(--gray)] text--sm underline mt-3 hover:text-[var(--orange)]">
          Already have an account? Login here
        </p>
      </Link>
    </div>
  );
};
export default RegisterForm;
