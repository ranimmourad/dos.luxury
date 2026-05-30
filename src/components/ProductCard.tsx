"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatTND } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  const onSale = !!product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
    >
      <div className="relative overflow-hidden bg-dos-cream aspect-[3/4]">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.newDrop && (
            <span className="bg-dos-black text-white text-[10px] tracking-[0.25em] uppercase px-2.5 py-1">
              New
            </span>
          )}
          {onSale && (
            <span className="bg-dos-gold text-dos-black text-[10px] tracking-[0.25em] uppercase px-2.5 py-1 font-semibold">
              Sale
            </span>
          )}
          {product.bestseller && !product.newDrop && (
            <span className="bg-white border border-dos-black text-dos-black text-[10px] tracking-[0.25em] uppercase px-2.5 py-1">
              Best
            </span>
          )}
        </div>

        {/* Image */}
        {/* Using <img> for simplicity with admin uploads (data URLs supported) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Second image hover */}
        {product.images[1] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[1]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}
      </div>

      <div className="pt-4 pb-2">
        <p className="text-[10px] tracking-[0.3em] uppercase text-dos-gold mb-1.5">
          {product.collection}
        </p>
        <h3 className="text-sm font-medium text-dos-black group-hover:text-dos-gold transition-colors">
          {product.name}
        </h3>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-sm font-semibold">{formatTND(product.price)}</span>
          {onSale && (
            <span className="text-xs text-neutral-400 line-through">
              {formatTND(product.compareAtPrice!)}
            </span>
          )}
        </div>

        {/* Color swatches */}
        <div className="mt-2 flex items-center gap-1.5">
          {product.colors.slice(0, 5).map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="w-3 h-3 rounded-full border border-dos-line"
              style={{ backgroundColor: c.hex }}
            />
          ))}
          {product.colors.length > 5 && (
            <span className="text-[10px] text-neutral-500">
              +{product.colors.length - 5}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
