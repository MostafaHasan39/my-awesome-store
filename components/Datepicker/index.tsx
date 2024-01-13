import classNames from "classnames";
import React, { InputHTMLAttributes } from "react";
import s from "./Datepicker.module.scss";

const Datepicker: React.FC<
  React.PropsWithChildren<InputHTMLAttributes<HTMLInputElement>>
> = ({ className, children, ...rest }) => {
  const inputRef = React.useRef<HTMLInputElement & { showPicker: Function }>(
    null
  );
  return (
    <div
      className={classNames(className, s.wrapper)}
      onClick={() => (inputRef?.current as any)?.showPicker()}
    >
      {children}
      <input type="date" className={s.hidden} ref={inputRef} {...rest} />
    </div>
  );
};

export default Datepicker;
