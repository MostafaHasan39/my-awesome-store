"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "swiper/react";
import { FreeMode } from "swiper/modules";
import Hero from "../Hero";
import s from "./HerosCarousel.module.scss";
import Button from "@/components/Button";
import RightArrow from "../Icons/RightArrow";
import LeftArrow from "../Icons/LeftArrow";
import { motion } from "framer-motion";
import cn from "classnames";
import {
  MACRO_ANIMATION_DURATION,
  MACRO_ANIMATION_EASING,
} from "@/lib/animation";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

const containerVariants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: MACRO_ANIMATION_DURATION * 2,
      ease: MACRO_ANIMATION_EASING,
      staggerChildren: 0.3,
      delayChildren: 0.1,
    },
  },
};

const Right = () => {
  const swiper = useSwiper();
  return (
    <RightArrow
      onClick={() => swiper.slideNext()}
      width={24}
      className={cn(s.arrow, s.arrow__right)}
    />
  );
};
const Left = () => {
  const swiper = useSwiper();
  return (
    <LeftArrow
      onClick={() => swiper.slidePrev()}
      width={24}
      className={cn(s.arrow, s.arrow__left)}
    />
  );
};

const HerosCarousel = () => {
  return (
    <div className={s.root}>
      <Swiper modules={[FreeMode]} slidesPerView={1} loop className={s.swiper}>
        <Right />
        <Left />
        <SwiperSlide className={s.swiperSlide}>
          <Hero mediaUrl="/assets/Hero1.webp">
            <motion.div
              variants={containerVariants}
              animate="visible"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute left-[15%] top-[20%] text-[var(--blue)]"
            >
              <motion.h1 variants={containerVariants} className="uppercase">
                Take care of
                <br /> your health
              </motion.h1>
              <motion.p
                variants={containerVariants}
                className="text--md hidden md:block mt-8"
              >
                Quis ipsum suspendisse ultrices gravida.
                <br /> Risus commodo viverra maecenas accumsan lacus vel
                facilisis.
              </motion.p>
              <motion.div variants={containerVariants}>
                <Button
                  href="/"
                  size="large"
                  fillAnimation
                  cssClasses="mt-8 uppercase"
                >
                  Shop Now
                </Button>
              </motion.div>
            </motion.div>
          </Hero>
        </SwiperSlide>

        <SwiperSlide className={s.swiperSlide}>
          {({ isActive }) => {
            return (
              <Hero mediaUrl="/assets/Hero2.webp">
                <motion.div
                  variants={containerVariants}
                  animate={isActive ? "visible" : undefined}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="absolute right-[15%] top-[20%] text-[var(--dark-yellow)]"
                >
                  <motion.h1 variants={containerVariants} className="uppercase">
                    Take care of
                    <br /> your health
                  </motion.h1>
                  <motion.p
                    variants={containerVariants}
                    className="text--md hidden md:block mt-8 text-black"
                  >
                    Quis ipsum suspendisse ultrices gravida.
                    <br /> Risus commodo viverra maecenas accumsan lacus vel
                    facilisis.
                  </motion.p>
                  <motion.div variants={containerVariants}>
                    <Button
                      href="/"
                      size="large"
                      fillAnimation
                      fillAnimationDirection="right"
                      cssClasses="mt-8 uppercase"
                      reverted
                      colorTheme="secondary"
                    >
                      Shop Now
                    </Button>
                  </motion.div>
                </motion.div>
              </Hero>
            );
          }}
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default HerosCarousel;
