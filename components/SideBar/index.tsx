"use client";
import { FC, PropsWithChildren, useEffect, useRef } from "react";
import s from "./SideBar.module.scss";
import cn from "classnames";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import { motion, AnimatePresence } from "framer-motion";
import {
  MICRO_ANIMATION_DURATION,
  MICRO_ANIMATION_EASING,
} from "@/lib/animation";
import { useUI } from "@/contexts/appUI";

interface ISidebarProps {
  onClose: () => void;
  direction: "right" | "left";
}

const contentVariants = {
  hidden_right: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: MICRO_ANIMATION_DURATION,
      ease: MICRO_ANIMATION_EASING,
    },
  },
  hidden_left: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: MICRO_ANIMATION_DURATION,
      ease: MICRO_ANIMATION_EASING,
    },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: MICRO_ANIMATION_DURATION,
      ease: MICRO_ANIMATION_EASING,
    },
  },
};

const rootVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: MICRO_ANIMATION_DURATION,
      ease: MICRO_ANIMATION_EASING,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: MICRO_ANIMATION_DURATION,
      ease: MICRO_ANIMATION_EASING,
    },
  },
};

const SideBar: FC<PropsWithChildren<ISidebarProps>> = ({
  children,
  onClose,
  direction = "right",
}) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { displaySidebar } = useUI();

  useEffect(() => {
    if (ref.current) {
      disableBodyScroll(ref.current, { reserveScrollBarGap: true });
    }

    return () => {
      if (ref && ref.current) {
        enableBodyScroll(ref.current);
      }
      clearAllBodyScrollLocks();
    };
  }, []);
  return (
    <AnimatePresence mode="wait">
      {displaySidebar && (
        <motion.div
          variants={rootVariants}
          initial="visible"
          exit="hidden"
          className={cn(s.root)}
        >
          <div className={s.wrapper}>
            <div className={s.backdrop} onClick={onClose} />
            {displaySidebar && (
              <motion.section
                variants={contentVariants}
                initial={direction === "right" ? "hidden_right" : "hidden_left"}
                exit={direction === "right" ? "hidden_right" : "hidden_left"}
                whileInView="visible"
                className={cn(
                  s.contentWrapper,
                  s[`contentWrapper__${direction}`]
                )}
              >
                <div>
                  <div className={s.sidebar} ref={ref}>
                    {children}
                  </div>
                </div>
              </motion.section>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default SideBar;
