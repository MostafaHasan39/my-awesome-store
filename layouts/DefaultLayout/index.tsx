"use client";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { FC, PropsWithChildren } from "react";
import { useUI } from "@/contexts/appUI";
import SideBar from "@/components/SideBar";
import CartView from "@/components/SideBar/views/CartView";
import HamburgerMenuView from "@/components/SideBar/views/HamburgerMenuView";

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  const { sidebarView, displaySidebar, closeSidebar } = useUI();
  return (
    <>
      <NavBar></NavBar>
      {children}

      <SideBar
        onClose={closeSidebar}
        direction={sidebarView === "CART_VIEW" ? "right" : "left"}
      >
        {sidebarView === "CART_VIEW" && <CartView />}
        {sidebarView === "HAMBURGER_MENU_VIEW" && <HamburgerMenuView />}
      </SideBar>

      <Footer></Footer>
    </>
  );
};
export default DefaultLayout;
