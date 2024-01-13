import s from "./CartView.module.scss";
import Close from "@/components/Icons/Close";
import Button from "@/components/Button";
import cn from "classnames";
import { useUI } from "@/contexts/appUI";
import CartLineItem from "@/components/CartLineItem";
import { useCart } from "@/contexts/cart";

import { AnimatePresence, motion } from "framer-motion";

import {
  MACRO_ANIMATION_DURATION,
  MACRO_ANIMATION_EASING,
} from "@/lib/animation";

const itemVariants = {
  hidden: {
    x: 300,
    opacity: 0,
    transition: {
      duration: MACRO_ANIMATION_DURATION,
      ease: MACRO_ANIMATION_EASING,
    },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: MACRO_ANIMATION_DURATION,
      ease: MACRO_ANIMATION_EASING,
    },
  },
};

const CartView = () => {
  const { closeSidebar } = useUI();
  const { lineItems: cartLineItems, cartTotal } = useCart();
  return (
    <div className={s.root}>
      <header>
        <span className="text--md bold">Shopping Cart</span>
        <Close width={16} onClick={closeSidebar} />
      </header>
      <div className={s.container}>
        <div className={s.content}>
          <AnimatePresence>
            {cartLineItems.map((item) => {
              return (
                <motion.div
                  variants={itemVariants}
                  initial="visible"
                  exit="hidden"
                  key={item.product.id}
                >
                  <CartLineItem item={item} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <div className={s.footer}>
          <div className={cn(s.total, "text--lg")}>
            <span>Subtotal:</span>
            <span>${cartTotal.toFixed(2)} USD</span>
          </div>
          <Button size="large" cssClasses="w-full rounded-full">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CartView;
