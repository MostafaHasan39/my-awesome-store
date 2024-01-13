"use client";
import { FC } from "react";
import { Product } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import ProductCard from "../ProductCard";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Right, Left } from "../NavigationArrows";
import s from "./ProductsCarousel.module.scss";

import "swiper/css";
import "swiper/css/free-mode";

interface IProductsCarouselProps {
  products: Product[];
  title: string;
}

const ProductsCarousel: FC<IProductsCarouselProps> = ({ products, title }) => {
  const isMobile = useMediaQuery(768);
  const isTablet = useMediaQuery(1024);

  const slidesPerView = isMobile ? 2 : isTablet ? 3 : 5;

  return (
    <div className={s.root}>
      <h2 className="mb-8 mx-auto text-center text-[var(--blue)]">{title}</h2>
      <Swiper
        modules={[FreeMode]}
        slidesPerView={slidesPerView}
        loop
        className={s.swiper}
      >
        <Right />
        <Left />
        {products.map((product, index) => {
          return (
            <SwiperSlide key={index} className={s.swiperSlide}>
              <ProductCard product={product} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
export default ProductsCarousel;
