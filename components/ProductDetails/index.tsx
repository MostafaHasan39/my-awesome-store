"use client";

import { Product } from "@/types";
import { FC, useState } from "react";
import s from "./ProductDetails.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode } from "swiper/modules";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Button from "../Button";
import { Right, Left } from "../NavigationArrows";
import QuantitySelector from "../QuantitySelector";
import { useCart } from "@/contexts/cart";
import { useUI } from "@/contexts/appUI";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

interface IProductDetailsProps {
  product: Product;
}

const ProductDetails: FC<IProductDetailsProps> = ({ product }) => {
  const { name, price, description } = product;
  const { updateProductQuantity } = useCart();
  const { setSidebarView, openSidebar } = useUI();
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { mediaGallery } = product;

  const isMatchingTabletViewPort = useMediaQuery(1024);

  const handleQuantityChange = (increment: "up" | "down") => {
    increment === "down" && quantity !== 1 && setQuantity(quantity - 1);
    increment === "up" && setQuantity(quantity + 1);
  };

  return (
    <section className={s.root}>
      <div className={s.mediaWrapper}>
        <div className={s.mainSwiperWrapper}>
          <Swiper
            modules={[Thumbs, FreeMode]}
            thumbs={{ swiper: thumbsSwiper }}
            className={s.mainSlider}
            slidesPerView={1}
            spaceBetween={10}
          >
            <Right />
            <Left />
            {mediaGallery?.map((m, index) => {
              return (
                <SwiperSlide key={m + index} className={s.swiperSlide}>
                  <div className={s.mainSliderImageWrapper}>
                    <Image
                      src={m}
                      alt="Carousel Image"
                      width={1200}
                      height={400}
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className={s.thumbsSwiperWrapper}>
          <Swiper
            modules={[Thumbs, FreeMode]}
            watchSlidesProgress
            onSwiper={setThumbsSwiper as any}
            slidesPerView={4}
            freeMode
            className={s.thumbsSlider}
            direction={isMatchingTabletViewPort ? "horizontal" : "vertical"}
            autoHeight
          >
            {mediaGallery?.map((m, index) => {
              return (
                <SwiperSlide key={"thumb" + m + index} className={s.thumbSlide}>
                  <div className={s.thumbsSliderImageWrapper}>
                    <Image
                      src={m}
                      alt="Carousel Image"
                      width={500}
                      height={300}
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className={s.detailsWrapper}>
        <div>
          <h4 className="text--md">{name}</h4>
          <h4 className="heading--lg text-[var(--gray)] my-2">${price}</h4>
          <p className="text-md">{description}</p>
        </div>

        <div className="flex items-center my-6">
          <QuantitySelector
            onQuantityStep={handleQuantityChange}
            quantity={quantity}
          />
          <Button
            size="normal"
            onClick={() => {
              if (quantity > 0) {
                updateProductQuantity(product, quantity);
                setSidebarView("CART_VIEW");
                openSidebar();
              }
            }}
            cssClasses="rounded-full ml-4"
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </section>
  );
};
export default ProductDetails;
