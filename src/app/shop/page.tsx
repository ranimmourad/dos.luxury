"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "@/components/ProductCard";
import type { Size } from "@/lib/types";

const ALL_SIZES: Size[] = ["S", "M", "L", "XL", "XXL"];

function ShopInner() {
  const sp = useSearchParams();
  const initialCollection = sp.get("collection") || "";
  const initialCategory = sp.get("category") || "";
  const initialPromo = sp.get("promo") === "1";
  const initialQuery = sp.get("q") || "";

  const { products } = useProducts();

  const [query, setQuery] = useState(initialQuery);
  const [collection, setCollection] = useState(initialCollection);
  const [category, setCategory] = useState(initialCategory);
  const [promo, setPromo] = useState(initialPromo);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [sort, setSort] = useState<"newest" | "price-asc" | "price-desc" | "popular">("newest");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setQuery(sp.get("q") || "");
    setCollection(sp.get("collection") || "");
    setCategory(sp.get("category") || "");
    setPromo(sp.get("promo") === "1");
  }, [sp]);

  const allCollections = useMemo(
    () => Array.from(new Set(products.map((p) => p.collection))),
    [products],
  );
  const allCategories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products],
  );
  const allColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => p.colors.forEach((c) => map.set(c.name, c.hex)));
    return Array.from(map, ([name, hex]) => ({ name, hex }));
  }, [products]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (query.trim())
      list = list.filter((p) =>
        (p.name + p.collection + p.description).toLowerCase().includes(query.toLowerCase()),
      );
    if (collection) list = list.filter((p) => p.collection === collection);
    if (category) list = list.filter((p) => p.category === category);
    if (promo) list = list.filter((p) => p.promo);
    if (sizes.length) list = list.filter((p) => sizes.some((s) => p.sizes.includes(s as Size)));
    if (colors.length)
      list = list.filter((p) => p.colors.some((c) => colors.includes(c.name)));

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price); break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price); break;
      case "popular":
        list.sort((a, b) => Number(b.bestseller) - Number(a.bestseller)); break;
      default:
        list.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    }
    return list;
  }, [products, query, collection, category, promo, sizes, colors, sort]);

  const toggleArr = (arr: string[], v: string) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  const clearAll = () => {
    setQuery("");
    setCollection("");
    setCategory("");
    setPromo(false);
    setSizes([]);
    setColors([]);
  };

  return (
    <>
      {/* Header */}
      <section className="bg-dos-black text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <p className="text-[11px] tracking-[0.4em] uppercase text-dos-gold">Shop</p>
          <h1 className="font-display text-4xl lg:text-5xl mt-3">
            {collection ? collection : promo ? "On Sale" : "All Products"}
          </h1>
          <p className="mt-3 text-neutral-400 max-w-xl">
            Heavyweight 320 GSM cotton. Premium embroidery. Made in Tunisia.
          </p>
        </div>
      </section>

      {/* Search + sort */}
      <section className="border-b border-dos-line bg-white sticky top-16 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-4 flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="flex-1 min-w-[200px] relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              width="16" height="16" viewBox="0 0 20 20" fill="none"
            >
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
              <path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full border border-dos-line pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-dos-gold"
            />
          </div>

          <button
            onClick={() => setShowFilters((v) => !v)}
            className="lg:hidden btn-outline-dark px-4 py-2.5 text-xs"
          >
            Filters
          </button>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="border border-dos-line px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-dos-gold"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </section>

      {/* Body */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-[240px_1fr] gap-10">
          {/* Filters */}
          <aside className={`${showFilters ? "block" : "hidden"} lg:block space-y-8`}>
            <div className="flex items-center justify-between">
              <h3 className="text-xs tracking-[0.3em] uppercase font-semibold">Filters</h3>
              <button onClick={clearAll} className="text-[11px] underline text-neutral-500 hover:text-dos-black">
                Clear all
              </button>
            </div>

            {/* Collection */}
            <div>
              <h4 className="text-[11px] tracking-[0.25em] uppercase mb-3 text-neutral-500">Collection</h4>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    checked={collection === ""}
                    onChange={() => setCollection("")}
                    className="accent-dos-gold"
                  />
                  <span>All collections</span>
                </label>
                {allCollections.map((c) => (
                  <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      checked={collection === c}
                      onChange={() => setCollection(c)}
                      className="accent-dos-gold"
                    />
                    <span>{c}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <h4 className="text-[11px] tracking-[0.25em] uppercase mb-3 text-neutral-500">Category</h4>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" checked={category === ""} onChange={() => setCategory("")} className="accent-dos-gold" />
                  <span>All categories</span>
                </label>
                {allCategories.map((c) => (
                  <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" checked={category === c} onChange={() => setCategory(c)} className="accent-dos-gold" />
                    <span>{c}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <h4 className="text-[11px] tracking-[0.25em] uppercase mb-3 text-neutral-500">Size</h4>
              <div className="flex flex-wrap gap-2">
                {ALL_SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSizes((arr) => toggleArr(arr, s))}
                    className={`min-w-[40px] px-2 py-1.5 text-xs border transition-colors ${
                      sizes.includes(s)
                        ? "border-dos-black bg-dos-black text-white"
                        : "border-dos-line hover:border-dos-black"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <h4 className="text-[11px] tracking-[0.25em] uppercase mb-3 text-neutral-500">Color</h4>
              <div className="flex flex-wrap gap-2">
                {allColors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColors((arr) => toggleArr(arr, c.name))}
                    title={c.name}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      colors.includes(c.name) ? "border-dos-gold scale-110" : "border-dos-line"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Promo */}
            <div>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={promo}
                  onChange={(e) => setPromo(e.target.checked)}
                  className="accent-dos-gold"
                />
                <span>On sale only</span>
              </label>
            </div>
          </aside>

          {/* Grid */}
          <div>
            <p className="text-xs text-neutral-500 mb-6">
              Showing <span className="text-dos-black font-semibold">{filtered.length}</span> {filtered.length === 1 ? "product" : "products"}
            </p>
            {filtered.length === 0 ? (
              <div className="border border-dashed border-dos-line py-20 text-center">
                <p className="font-display text-2xl">No products match your filters.</p>
                <button onClick={clearAll} className="mt-5 btn-outline-dark px-6 py-3 text-xs">
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-sm text-neutral-500">Loading…</div>}>
      <ShopInner />
    </Suspense>
  );
}
