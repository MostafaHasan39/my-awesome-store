import s from "./NavBar.module.scss";
import Link from "next/link";
import { navLinks } from "./Constants";
import Image from "next/image";
import cn from "classnames";
import { default as UserIcon } from "../Icons/User";
import { default as CartIcon } from "../Icons/CartIcon";
import { default as HamburgerIcon } from "../Icons/Hamburger";
import { useUI } from "@/contexts/appUI";
import dynamic from "next/dynamic";
import useScrollDirection from "@/hooks/useScrollDirection";
import { motion, AnimatePresence } from "framer-motion";

import {
  MACRO_ANIMATION_DURATION,
  MACRO_ANIMATION_EASING,
} from "@/lib/animation";

const navVariants = {
  hidden: {
    top: -300,
    transition: {
      duration: MACRO_ANIMATION_DURATION,
      ease: MACRO_ANIMATION_EASING,
    },
  },
  visible: {
    top: 0,
    transition: {
      duration: MACRO_ANIMATION_DURATION,
      ease: MACRO_ANIMATION_EASING,
    },
  },
};

const CartCount = dynamic(() => import("./CartCount"), {
  ssr: false,
});

const NavBar = () => {
  const { setSidebarView, openSidebar } = useUI();
  const { scrollDirection, scrollY } = useScrollDirection();

  return (
    <AnimatePresence>
      {(scrollDirection === "up" || scrollY < 60) && (
        <motion.nav
          variants={navVariants}
          initial="visible"
          animate="visible"
          exit="hidden"
          className={cn(s.root, { [s.transparent]: scrollY < 60 })}
        >
          <div className={"lg:hidden w-[40%]"}>
            <HamburgerIcon
              onClick={() => {
                setSidebarView("HAMBURGER_MENU_VIEW");
                openSidebar();
              }}
            />
          </div>

          <ul
            className={cn(
              s.linksWrapper,
              "hidden lg:flex justify-start gap-6 xl:gap-12 w-[40%]"
            )}
          >
            {navLinks.map((navLink) => (
              <li key={navLink.label}>
                <Link href={navLink.url}>{navLink.label}</Link>
              </li>
            ))}
          </ul>
          <div className=" flex justify-center">
            <Link href="/">
              <Image
                alt="Nav-Logo"
                width={90}
                height={24}
                src="/assets/logo_black.webp"
              ></Image>
            </Link>
          </div>

          <div
            className={cn(
              s.icons_wrapper,
              "flex justify-end items-baseline gap-3 w-[40%]"
            )}
          >
            <Link href={"/account/login"}>
              <UserIcon className={s.userIcon} />
            </Link>

            <div
              className={s.cartIconWrapper}
              onClick={() => {
                setSidebarView("CART_VIEW");
                openSidebar();
              }}
            >
              <CartCount />
              <CartIcon className={s.cartIcon} width={24} height={18} />
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
export default NavBar;
