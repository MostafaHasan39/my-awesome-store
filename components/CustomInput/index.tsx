"use client";
import cn from "classnames";
import s from "./CustomInput.module.scss";

import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  ChangeEvent,
} from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onChange?: (...args: any[]) => any;
  hasErrors?: Boolean;
}

const Input: React.FC<React.PropsWithChildren<InputProps>> = (props) => {
  const {
    className,
    children,
    onChange,
    hasErrors,
    id,
    placeholder,
    name,
    type,
    defaultValue,
    value,
    ...rest
  } = props;
  const [v, setValue] = useState(value || defaultValue);
  const [labelLifted, setLabelLifted] = useState(!!v);

  useEffect(() => {
    setValue(value || defaultValue);
  }, [value, defaultValue]);
  useEffect(() => {
    setLabelLifted(!!v);
  }, [v]);

  const rootClassName = cn(s.field, className, { [s.error]: hasErrors });
  const elementRef = useRef<HTMLInputElement>(null);

  const togglePassword = () => {
    if (elementRef && elementRef?.current && elementRef.current?.type) {
      elementRef.current.type =
        elementRef.current.type === "password" ? "text" : "password";
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
      setValue(e.target.value);
    }
    return null;
  };

  return (
    <div className={cn(s.wrapper, className)}>
      <input
        {...rest}
        value={v}
        ref={elementRef}
        id={id}
        className={rootClassName}
        onChange={handleOnChange}
        onFocus={(e) => {
          setLabelLifted(true);
          rest?.onFocus?.(e);
        }}
        onBlur={(e) => {
          setLabelLifted(!!e.target.value);
          rest?.onBlur?.(e);
        }}
        name={name}
        placeholder={placeholder}
        type={type}
      />

      <label
        htmlFor={id}
        className={cn(s.label, {
          [s.label__Lifted]: labelLifted,
        })}
      >
        {placeholder}
      </label>
      {type === "password" && (
        <label
          htmlFor="passwordWithToggle"
          onClick={togglePassword}
          className={cn(s.eye)}
        ></label>
      )}
    </div>
  );
};

export default Input;
