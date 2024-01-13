"use client";
import { useCallback } from "react";
import s from "./LoginForm.module.scss";
import CustomInput from "@/components/CustomInput";
import Button from "@/components/Button";
import { useFormik } from "formik";
import { FormValues, initialValues, validationSchema } from "./formSchema";
import Link from "next/link";
const LoginForm = () => {
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

  const handleBlur = useCallback(
    (key: keyof FormValues) => () => {
      formik.setFieldTouched(key, true);
    },
    [formik]
  );

  return (
    <div className={s.root}>
      <h2>Login Form</h2>
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
      </div>

      <Button
        size="large"
        cssClasses="w-full rounded-full mt-8"
        disabled={!formik.isValid}
      >
        Login
      </Button>

      <Link href={"/account/register"}>
        <p className="text-[var(--gray)] text--sm underline mt-3 hover:text-[var(--orange)]">
          New customer? Create your account
        </p>
      </Link>
    </div>
  );
};
export default LoginForm;
