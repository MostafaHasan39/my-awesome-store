import { FC } from "react";
import { LineItem } from "@/types";
import s from "./CartLineItem.module.scss";
import Image from "next/image";
import Trash from "../Icons/Trash";
import { useCart } from "@/contexts/cart";
import QuantitySelector from "../QuantitySelector";

interface ICartLineItemProps {
  item: LineItem;
}

const CartLineItem: FC<ICartLineItemProps> = ({ item }) => {
  const { quantity, product } = item;

  const { image, name, price } = product;
  const { removeProduct, updateProductQuantity } = useCart();
  return (
    <div className={s.root}>
      <div className={s.imageWrapper}>
        <Image
          src={image}
          alt="LineItem Product"
          width={360}
          height={360}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
      <div className={s.detailsWrapper}>
        <h3>{name}</h3>
        <span className="text--sm">${(quantity * price).toFixed(2)}</span>
        <QuantitySelector
          onQuantityStep={(increment) => {
            increment === "down" && updateProductQuantity(product, -1);
            increment === "up" && updateProductQuantity(product, 1);
          }}
          quantity={quantity}
          extraCssClasses={"my-2"}
        />
        <Trash
          width={18}
          height={18}
          className={s.delete}
          onClick={() => {
            removeProduct(product.id);
          }}
        />
      </div>
    </div>
  );
};
export default CartLineItem;
