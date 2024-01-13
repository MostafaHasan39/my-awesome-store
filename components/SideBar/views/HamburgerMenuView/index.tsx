import { navLinks } from "@/components/NavBar/Constants";
import Link from "next/link";
import Close from "@/components/Icons/Close";
import { useUI } from "@/contexts/appUI";

import s from "./HamburgerMenuView.module.scss";

const HamburgerMenuView = () => {
  const { closeSidebar } = useUI();
  return (
    <div className={s.root}>
      <Close width={16} onClick={closeSidebar} />
      <ul>
        {navLinks.map((navLink) => {
          return (
            <li key={navLink.label}>
              <Link href={navLink.url}>{navLink.label}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default HamburgerMenuView;
