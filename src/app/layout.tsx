import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AnnouncementBar from "@/components/AnnouncementBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "D.O.S — Luxury Streetwear | Luxury in Every Detail",
  description:
    "D.O.S Luxury Streetwear. Premium embroidered oversized tees, hand-crafted in Tunisia. Quality, Craftsmanship, Purpose.",
  keywords: ["DOS", "Dammak Outfit Store", "Tunisian streetwear", "luxury streetwear", "oversized tee", "premium embroidery"],
  openGraph: {
    title: "D.O.S — Luxury Streetwear",
    description: "Luxury in every detail.",
    url: "https://dammak.outfit.store",
    siteName: "D.O.S",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-white text-dos-black antialiased">
        <ProductProvider>
          <CartProvider>
            <AnnouncementBar />
            <Navbar />
            <main className="min-h-[60vh]">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
