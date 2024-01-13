"use client";
import { FC, useEffect, useState, useRef, MutableRefObject } from "react";
import s from "./ParallaxHero.module.scss";
import { motion } from "framer-motion";
import {
  MACRO_ANIMATION_DURATION,
  MACRO_ANIMATION_EASING,
} from "@/lib/animation";
import Button from "@/components/Button";

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

interface IParallaxHeroProps {
  backgroundUrl: string;
}

const ParallaxHero: FC<IParallaxHeroProps> = ({ backgroundUrl }) => {
  const [intersectionRatio, setIntersectionRatio] = useState<number>(0);
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const offsetValue = 10; //(fraction of VH) Control animation speed (The offset that the background position Y will be moving based on the intersection ratio)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersectionRatio(entry?.intersectionRatio);
      },
      {
        rootMargin: "0px",
        threshold: Array.from({ length: 100 }, (_, i) => (i + 1) / 100),
      }
    );
    if (ref?.current) {
      observer.observe(ref.current);
    }
  }, []);

  return (
    <div
      className={s.root}
      ref={ref}
      style={{
        backgroundImage: `url("${backgroundUrl}")`,
        backgroundPositionY: `-${intersectionRatio * offsetValue}vh`,
      }}
    >
      <motion.div
        variants={containerVariants}
        animate="visible"
        initial="hidden"
        whileInView="visible"
        className="absolute left-[15%] top-[20%] text-[var(--blue)]"
        viewport={{
          once: true,
        }}
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
          <br /> Risus commodo viverra maecenas accumsan lacus vel facilisis.
        </motion.p>
        <motion.div variants={containerVariants}>
          <Button href="/" size="large" fillAnimation cssClasses="mt-8">
            Shop Now
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default ParallaxHero;
