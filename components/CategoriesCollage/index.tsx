"use client";
import Collage from "../Collage";
import MediaWithContentCard from "../MediaWithContentCard";
import Button from "../Button";

import {
  MACRO_ANIMATION_DURATION,
  MACRO_ANIMATION_EASING,
} from "@/lib/animation";
import { motion } from "framer-motion";

const containerVariants = {
  hidden_left: {
    x: -140,
    opacity: 0,
  },
  hidden_right: {
    x: 140,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: MACRO_ANIMATION_DURATION * 2,
      ease: MACRO_ANIMATION_EASING,
      staggerChildren: 0.3,
      delayChildren: 0.1,
    },
  },
};

const CategoriesCollage = () => {
  return (
    <Collage>
      {
        <MediaWithContentCard
          mediaUrl="/assets/collageItem1.webp"
          contentPosition="left"
          extraClasses="col-span-6 md:col-span-3 lg:col-span-2"
        >
          <motion.div
            variants={containerVariants}
            animate="visible"
            initial="hidden_left"
            whileInView="visible"
          >
            <motion.span
              variants={containerVariants}
              className="text--sm text-[var(--blue)] uppercase mb-1"
            >
              Nutrition
            </motion.span>
            <motion.h2
              variants={containerVariants}
              className="text-[var(--blue)] uppercase"
            >
              For Life
            </motion.h2>
            <motion.div variants={containerVariants}>
              <Button
                size="normal"
                fillAnimation
                fillAnimationDirection="left"
                cssClasses="mt-3"
              >
                SHOP NOW
              </Button>
            </motion.div>
          </motion.div>
        </MediaWithContentCard>
      }
      {
        <MediaWithContentCard
          mediaUrl="/assets/collageItem2.webp"
          overlayed
          extraClasses="col-span-6 md:col-span-3 lg:col-span-2"
        >
          <div className="text-center">
            <span className="text--md font-bold text-[var(--orange)] uppercase mb-1">
              Nutrition for sport
            </span>
            <h2 className="text-white uppercase">Up to 50% off</h2>
          </div>
        </MediaWithContentCard>
      }
      {
        <MediaWithContentCard
          mediaUrl="/assets/collageItem3.webp"
          contentPosition="left"
          extraClasses="col-span-6 md:col-span-6 lg:col-span-2"
        >
          <motion.div
            variants={containerVariants}
            animate="visible"
            initial="hidden_right"
            whileInView="visible"
          >
            <motion.span
              variants={containerVariants}
              className="text--sm text-white uppercase mb-1"
            >
              Vitamin
            </motion.span>
            <motion.h2
              variants={containerVariants}
              className="text-white uppercase"
            >
              For Kid
            </motion.h2>
            <motion.div variants={containerVariants}>
              <Button
                size="normal"
                fillAnimation
                fillAnimationDirection="right"
                cssClasses="mt-3"
                reverted
              >
                SHOP NOW
              </Button>
            </motion.div>
          </motion.div>
        </MediaWithContentCard>
      }
    </Collage>
  );
};
export default CategoriesCollage;
