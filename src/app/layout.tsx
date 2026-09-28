import type { Metadata } from "next";
import { Anton, Barlow } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import BrandBackground from "@/components/BrandBackground";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const barlow = Barlow({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "URBAN SPORT — Muévete con estilo, ahorra en cada paso",
  description: "Ropa deportiva y calzado para hombre y mujer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${anton.variable} ${barlow.variable}`}>
      <body className="bg-tl-black text-tl-white font-sans min-h-screen">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <BrandBackground variant="ambient" />
        </div>
        <FavoritesProvider>
          <CartProvider>
            <div className="sticky top-0 z-40">
              <AnnouncementBar />
              <Header />
            </div>
            {children}
            <Footer />
            <CartDrawer />
          </CartProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
