import { FC } from "react";
import s from "./QuantitySelector.module.scss";
import Minus from "../Icons/Minus";
import Plus from "../Icons/Plus";
import cn from "classnames";

interface IQuantitySelectorProps {
  quantity: number;
  extraCssClasses?: string;
  onQuantityStep: (increment: "up" | "down") => void;
}

const QuantitySelector: FC<IQuantitySelectorProps> = ({
  quantity,
  extraCssClasses = "",
  onQuantityStep,
}) => {
  return (
    <div className={cn(s.root, extraCssClasses)}>
      <div
        onClick={() => {
          onQuantityStep("down");
        }}
      >
        <Minus width={12} />
      </div>
      <span>{quantity}</span>
      <div
        onClick={() => {
          onQuantityStep("up");
        }}
      >
        <Plus width={12} />
      </div>
    </div>
  );
};
export default QuantitySelector;
