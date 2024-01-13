import type { Metadata } from "next";
import "./globals.scss";
import AppUIProvider from "@/contexts/appUI";
import CartProvider from "@/contexts/cart";
import DefaultLayout from "@/layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "My Awesome Store",
  description: "This is my awesome store built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <AppUIProvider>
            <DefaultLayout>{children}</DefaultLayout>
          </AppUIProvider>
        </CartProvider>
      </body>
    </html>
  );
}
