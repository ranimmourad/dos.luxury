import type { Product } from "./types";

/**
 * Real catalogue based on the three confirmed D.O.S collections.
 * Images live in /public/uploads. No fake products.
 */
export const initialProducts: Product[] = [
  {
    id: "dos-summer-set-01",
    slug: "dos-summer-set",
    name: "Fakhama Set",
    collection: "Summer 2026",
    description:
      "The Fakhama Set — an oversized matching tee and shorts crafted in heavyweight 320 GSM cotton with signature Arabic calligraphy embroidery at the chest and trims. Designed for the Tunisian summer, built to last.",
    details: [
      "Oversized fit",
      "320 GSM heavyweight cotton",
      "Signature Arabic calligraphy embroidery",
      "Embroidered hem trim — tee & shorts",
      "Pre-washed for soft hand-feel",
      "Made in Tunisia",
    ],
    price: 199,
    compareAtPrice: 239,
    images: [
      "/uploads/dos-summer-set.jpg",
    ],
    colors: [
      { name: "White", hex: "#F7F4EE" },
      { name: "Black", hex: "#0A0A0A" },
      { name: "Beige", hex: "#D6C4A8" },
      { name: "Green", hex: "#5C6A4B" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    gsm: 320,
    featured: true,
    bestseller: true,
    promo: true,
    newDrop: true,
    stock: 45,
    category: "Sets",
    createdAt: "2026-05-01",
  },
  {
    id: "only-the-best-01",
    slug: "only-the-best-tee",
    name: "Only The Best Tee",
    collection: "Only The Best",
    description:
      "The Only The Best oversized tee — our manifesto stitched on your back. Tonal premium embroidery reading DOS LUXURY · ONLY THE BEST · QUALITY · CRAFTSMANSHIP · PURPOSE on heavyweight 320 GSM cotton.",
    details: [
      "Oversized fit",
      "320 GSM heavyweight cotton",
      "Premium tonal embroidery (back placement)",
      "Reinforced ribbed neckline",
      "Side seam construction",
      "Made in Tunisia",
    ],
    price: 129,
    compareAtPrice: 149,
    images: [
      "/uploads/only-the-best-1.jpg",
      "/uploads/only-the-best-2.jpg",
    ],
    colors: [
      { name: "Beige", hex: "#D6C4A8" },
      { name: "Olive Green", hex: "#5C6A4B" },
      { name: "Black", hex: "#0A0A0A" },
      { name: "White", hex: "#F7F4EE" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    gsm: 320,
    featured: true,
    bestseller: true,
    promo: false,
    newDrop: true,
    stock: 60,
    category: "T-Shirts",
    createdAt: "2026-04-15",
  },
  {
    id: "da-vinci-01",
    slug: "da-vinci-tee",
    name: "Da Vinci Tee",
    collection: "Da Vinci Collection",
    description:
      "An ode to the master. The Da Vinci tee features an artistic graphic on heavyweight 320 GSM cotton — a tribute to craftsmanship, proportion and timeless design. Oversized fit, refined detail.",
    details: [
      "Oversized fit",
      "320 GSM heavyweight cotton",
      "Artistic graphic print",
      "Drop shoulder construction",
      "Garment-washed finish",
      "Made in Tunisia",
    ],
    price: 139,
    images: [
      "/uploads/da-vinci-collection.jpg",
    ],
    colors: [
      { name: "Cream", hex: "#F2EAD8" },
      { name: "Black", hex: "#0A0A0A" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    gsm: 320,
    featured: true,
    bestseller: false,
    promo: false,
    newDrop: true,
    stock: 30,
    category: "T-Shirts",
    createdAt: "2026-05-10",
  },
];
