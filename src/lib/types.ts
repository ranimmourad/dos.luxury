export type Size = "S" | "M" | "L" | "XL" | "XXL";

export type Product = {
  id: string;
  slug: string;
  name: string;
  collection: string;
  description: string;
  details: string[];
  price: number;          // in TND
  compareAtPrice?: number;
  images: string[];       // paths under /uploads
  colors: { name: string; hex: string }[];
  sizes: Size[];
  gsm: number;
  featured: boolean;
  bestseller: boolean;
  promo: boolean;
  newDrop: boolean;
  stock: number;
  category: "Sets" | "T-Shirts" | "Shorts";
  createdAt: string;
};
