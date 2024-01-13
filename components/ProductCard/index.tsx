import { FC } from "react";
import s from "./ProductCard.module.scss";
import Image from "next/image";
import { default as CartIcon } from "@/components/Icons/CartIcon";
import { Product } from "@/types";
import Link from "next/link";
import { useCart } from "@/contexts/cart";
import { useUI } from "@/contexts/appUI";
import { motion } from "framer-motion";

import {
  MACRO_ANIMATION_DURATION,
  MACRO_ANIMATION_EASING,
} from "@/lib/animation";

interface IProductCardProps {
  product: Product;
  shouldAnimate?: boolean;
}

const cardVariants = {
  hidden: {
    y: 40,
  },
  visible: {
    y: 0,
    transition: {
      duration: MACRO_ANIMATION_DURATION * 2,
      ease: MACRO_ANIMATION_EASING,
    },
  },
};

const ProductCard: FC<IProductCardProps> = ({ product, shouldAnimate }) => {
  const { price, name, image, id } = product;
  const { updateProductQuantity } = useCart();
  const { setSidebarView, openSidebar } = useUI();

  return (
    <motion.div
      variants={shouldAnimate ? cardVariants : undefined}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
      }}
      className={s.root}
    >
      <Link href={`/products/${id}`}>
        <div className={s.cardWrapper}>
          <div className={s.imageWrapper}>
            <Image
              src={image}
              alt="Hero"
              width={500}
              height={400}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
          <div className={s.backdrop}>
            <div className="mx-auto absolute bottom-2 flex justify-center items-center w-full gap-2">
              <span
                onClick={(e) => {
                  e.preventDefault();
                  updateProductQuantity(product, 1);
                  setSidebarView("CART_VIEW");
                  openSidebar();
                }}
              >
                <CartIcon />
              </span>
            </div>
          </div>
        </div>
      </Link>

      <div className={s.detailsWrapper}>
        <h4 className="text--md capitalize">
          <Link href={`/products/${id}`}>{name}</Link>
        </h4>
        <span className="text--sm">${price}</span>
      </div>
    </motion.div>
  );
};
export default ProductCard;
