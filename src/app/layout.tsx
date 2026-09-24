import type { Metadata } from "next";
import { Anton, Barlow } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const barlow = Barlow({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TOTAL LOOKS — Tu look sube, los precios bajan",
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
        {children}
      </body>
    </html>
  );
}
