import s from "./Footer.module.scss";
import { footerLists } from "./Constants";
import Link from "next/link";
import Facebook from "../Icons/Facebook";
import Twitter from "../Icons/Twitter";
import Pinterest from "../Icons/Pinterest";
import Tumblr from "../Icons/Tumblr";
import Telegram from "../Icons/Telegram";
import { motion } from "framer-motion";

import {
  MACRO_ANIMATION_DURATION,
  MACRO_ANIMATION_EASING,
} from "@/lib/animation";

const listVariants = {
  hidden: {
    y: 40,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: MACRO_ANIMATION_DURATION * 2,
      ease: MACRO_ANIMATION_EASING,
    },
  },
};

const Footer = () => {
  return (
    <footer className={s.root}>
      {footerLists.map((list, index) => {
        return (
          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            key={index}
          >
            <h3>{list.label}</h3>
            <ul className="mt-4">
              {list.links.map((link, index) => {
                return (
                  <li
                    key={link.label}
                    className="mb-3 text--sm text-[var(--gray)] hover:text-[var(--orange)]"
                  >
                    <Link href={link.url}>{link.label}</Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        );
      })}
      <motion.div
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
        }}
      >
        <h3>FOLLOW US</h3>
        <div className="flex gap-2 mt-4">
          <Link href={"https://facebook.com"} target="_blank">
            <Facebook width={18} height={18} />
          </Link>
          <Link href={"https://twitter.com"} target="_blank">
            <Twitter width={18} height={18} />
          </Link>
          <Link href={"https://www.pinterest.com/"} target="_blank">
            <Pinterest width={18} height={18} />
          </Link>
          <Link href={"https://www.tumblr.com/"} target="_blank">
            <Tumblr width={18} height={18} />
          </Link>
          <Link href={"https://telegram.me/"} target="_blank">
            <Telegram width={18} height={18} />
          </Link>
        </div>
      </motion.div>
    </footer>
  );
};
export default Footer;
