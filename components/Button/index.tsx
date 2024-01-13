import { FC, PropsWithChildren, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import cn from "classnames";
import s from "./Button.module.scss";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  copy?: string;
  size: "normal" | "large";
  href?: string;
  target?: string;
  display?: "inline" | "block";
  cssClasses?: string;
  fillAnimation?: boolean;
  fillAnimationDirection?: "left" | "right" | "top" | "bottom";
  reverted?: boolean;
  colorTheme?: "primary" | "secondary";
}

const Button: FC<PropsWithChildren<IButtonProps>> = ({
  copy,
  size = "normal",
  href,
  target,
  children,
  cssClasses,
  display = "block",
  fillAnimation = false,
  fillAnimationDirection = "bottom",
  reverted = false,
  colorTheme = "primary",
  ...rest
}) => {
  return href ? (
    <Link href={href} target={target}>
      <button
        className={cn(
          s.root,
          {
            [s.inline]: display === "inline",
            [s.reverted]: reverted,
            [s.fillAnimation]: fillAnimation,
            [s[`fillAnimation__${fillAnimationDirection}`]]: fillAnimation,
            [s[`colorTheme__${colorTheme}`]]: colorTheme,
          },

          s[`${size}`],
          cssClasses
        )}
        {...rest}
      >
        {copy || children}
      </button>
    </Link>
  ) : (
    <button
      className={cn(
        s.root,
        {
          [s.inline]: display === "inline",
          [s.reverted]: reverted,
          [s.fillAnimation]: fillAnimation,
          [s[`fillAnimation__${fillAnimationDirection}`]]: fillAnimation,
          [s[`colorTheme__${colorTheme}`]]: colorTheme,
        },
        s[`${size}`],
        cssClasses
      )}
      {...rest}
    >
      {copy || children}
    </button>
  );
};
export default Button;
