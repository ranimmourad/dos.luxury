"use client";

import { useMemo, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { formatTND } from "@/lib/format";
import ProductCard from "@/components/ProductCard";
import type { Size } from "@/lib/types";

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const { products, hydrated } = useProducts();
  const { addItem } = useCart();

  const product = useMemo(
    () => products.find((p) => p.slug === params.slug),
    [products, params.slug],
  );

  const related = useMemo(() => {
    if (!product) return [];
    return products.filter((p) => p.id !== product.id).slice(0, 4);
  }, [products, product]);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"details" | "shipping" | "care">("details");
  const [added, setAdded] = useState(false);

  if (!hydrated) {
    return <div className="py-32 text-center text-sm text-neutral-500">Loading…</div>;
  }
  if (!product) {
    notFound();
  }

  const onAdd = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size: selectedSize,
      color: product.colors[selectedColor].name,
      quantity: qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const onSale = !!product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <>
      {/* Breadcrumbs */}
      <div className="border-b border-dos-line bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-4 text-[11px] tracking-[0.25em] uppercase text-neutral-500">
          <Link href="/" className="hover:text-dos-black">Home</Link>
          <span className="mx-2 text-neutral-300">/</span>
          <Link href="/shop" className="hover:text-dos-black">Shop</Link>
          <span className="mx-2 text-neutral-300">/</span>
          <span className="text-dos-black">{product.name}</span>
        </div>
      </div>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10 lg:py-14 grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16">
          {/* GALLERY */}
          <div>
            <div className="relative aspect-[4/5] bg-dos-cream overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.newDrop && (
                  <span className="bg-dos-black text-white text-[10px] tracking-[0.25em] uppercase px-3 py-1.5">
                    New
                  </span>
                )}
                {onSale && (
                  <span className="bg-dos-gold text-dos-black text-[10px] tracking-[0.25em] uppercase px-3 py-1.5 font-semibold">
                    Sale
                  </span>
                )}
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square overflow-hidden border-2 transition-all ${
                      activeImage === i ? "border-dos-gold" : "border-transparent"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="lg:pt-4">
            <p className="text-[11px] tracking-[0.4em] uppercase text-dos-gold mb-3">
              {product.collection}
            </p>
            <h1 className="font-display text-3xl lg:text-4xl leading-tight">{product.name}</h1>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl font-semibold">{formatTND(product.price)}</span>
              {onSale && (
                <>
                  <span className="text-base text-neutral-400 line-through">
                    {formatTND(product.compareAtPrice!)}
                  </span>
                  <span className="text-xs text-dos-gold font-semibold">
                    Save {formatTND(product.compareAtPrice! - product.price)}
                  </span>
                </>
              )}
            </div>

            <p className="mt-6 text-sm text-neutral-600 leading-relaxed">
              {product.description}
            </p>

            {/* Color */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] tracking-[0.25em] uppercase text-neutral-500">Color</span>
                <span className="text-xs text-dos-black">{product.colors[selectedColor].name}</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(i)}
                    aria-label={c.name}
                    className={`w-9 h-9 rounded-full border-2 transition-all ${
                      selectedColor === i ? "border-dos-gold scale-110" : "border-dos-line"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] tracking-[0.25em] uppercase text-neutral-500">Size</span>
                <button className="text-[11px] underline text-neutral-500 hover:text-dos-black">
                  Size guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-3 text-sm border transition-all ${
                      selectedSize === s
                        ? "border-dos-black bg-dos-black text-white"
                        : "border-dos-line hover:border-dos-black"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-[11px] tracking-[0.25em] uppercase text-neutral-500">Quantity</span>
              <div className="inline-flex items-center border border-dos-line">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 hover:bg-dos-cream"
                >−</button>
                <span className="w-10 h-10 flex items-center justify-center text-sm">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 hover:bg-dos-cream"
                >+</button>
              </div>
              <span className="text-[11px] text-neutral-500">
                {product.stock} in stock
              </span>
            </div>

            {/* Add to cart */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onAdd}
                className={`flex-1 btn-gold py-4 text-xs transition-all ${added ? "opacity-90" : ""}`}
              >
                {added ? "✓ Added to cart" : "Add to Cart"}
              </button>
              <Link
                href="/cart"
                className="flex-1 sm:flex-none btn-outline-dark py-4 px-8 text-xs text-center"
              >
                View Cart
              </Link>
            </div>

            {/* USPs */}
            <div className="mt-8 border-t border-dos-line pt-6 grid grid-cols-3 gap-4 text-[11px] tracking-[0.2em] uppercase text-neutral-600">
              <div className="flex items-start gap-2">
                <span className="text-dos-gold">·</span>
                <span>Free shipping in Tunisia</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-dos-gold">·</span>
                <span>Cash on delivery</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-dos-gold">·</span>
                <span>7 day returns</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-10 border-t border-dos-line">
              <div className="flex gap-6 mt-5">
                {(["details", "shipping", "care"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`text-[11px] tracking-[0.25em] uppercase pb-2 border-b-2 ${
                      tab === t ? "border-dos-gold text-dos-black" : "border-transparent text-neutral-500"
                    }`}
                  >
                    {t === "details" ? "Product Details" : t === "shipping" ? "Shipping" : "Care"}
                  </button>
                ))}
              </div>

              <div className="mt-5 text-sm text-neutral-600 leading-relaxed">
                {tab === "details" && (
                  <ul className="space-y-2">
                    {product.details.map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <span className="text-dos-gold mt-1">·</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {tab === "shipping" && (
                  <div className="space-y-2">
                    <p>Free standard shipping across Tunisia (2–5 business days).</p>
                    <p>Cash on delivery available nationwide.</p>
                    <p>International shipping on request — contact us at <a href="mailto:yassindammak820@gmail.com" className="text-dos-gold underline">yassindammak820@gmail.com</a>.</p>
                  </div>
                )}
                {tab === "care" && (
                  <ul className="space-y-2">
                    <li>· Machine wash cold (≤ 30°C), inside out.</li>
                    <li>· Wash with similar colors.</li>
                    <li>· Do not bleach. Do not tumble dry.</li>
                    <li>· Iron on low, avoid embroidered areas.</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 lg:py-20 bg-dos-cream/30">
          <div className="max-w-7xl mx-auto px-5 lg:px-10">
            <p className="text-[11px] tracking-[0.4em] uppercase text-dos-gold">You may also like</p>
            <h2 className="font-display text-3xl lg:text-4xl mt-2 mb-10">Related Products</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
