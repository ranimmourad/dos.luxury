"use client";

import Link from "next/link";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const { products } = useProducts();
  const featured = products.filter((p) => p.featured).slice(0, 6);
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 4);
  const promos = products.filter((p) => p.promo).slice(0, 3);

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative bg-dos-white text-black overflow-hidden">
        {/* gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dos-gold to-transparent" />

        {/* CHANGED HERE: Removed "reverse", now Image comes first in the code so it's on the left/desktop and top/mobile */}
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-20 lg:py-32 flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* HERO IMAGE - MOVED TO THE TOP */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              {/* gold frame */}
              <div className="absolute inset-0 border border-dos-gold/40 z-10 pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-dos-gold/20 z-0" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/uploads/dos-logo.jpg"
                alt="DOS Luxury"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-4 text-[11px] tracking-[0.3em] uppercase text-dos-gold/80 text-center">
            </p>
          </div>

          {/* HERO TEXT - MOVED TO THE BOTTOM */}
          <div className="relative z-10">
            <p className="text-[11px] tracking-[0.4em] uppercase text-dos-gold mb-6">
              New Drop · Summer 2026
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] font-medium">
              Luxury in every <em className="not-italic text-gradient-gold">detail</em>.
            </h1>
            <p className="mt-6 text-base text-neutral-300 max-w-md leading-relaxed">
              D.O.S — Dammak Outfit Store. A Tunisian house of streetwear,
              founded on craftsmanship, premium embroidery and 320 GSM
              heavyweight cotton.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/shop" className="btn-gold px-8 py-4 text-xs inline-block">
                Shop the Drop
              </Link>
              <Link
                href="/shop?collection=Only%20The%20Best"
                className="btn-outline-gold px-8 py-4 text-xs inline-block"
              >
                Only The Best
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: "320", v: "GSM cotton" },
                { k: "100%", v: "Made in Tunisia" },
                { k: "Free", v: "Shipping" },
              ].map((s) => (
                <div key={s.v}>
                  <p className="text-2xl font-display text-dos-gold">{s.k}</p>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mt-1">
                    {s.v}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========== COLLECTIONS BANNER ========== */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.4em] uppercase text-dos-gold">Our Collections</p>
            <h2 className="font-display text-3xl lg:text-5xl mt-3">
              Three stories, one house.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { img: "/uploads/dos-summer-set.jpg", title: "Fakhama Set", sub: "Arabic calligraphy inspired", link: "/shop?collection=Summer%202026" },
              { img: "/uploads/only-the-best-1.jpg", title: "Only The Best", sub: "Quality · Craftsmanship · Purpose", link: "/shop?collection=Only%20The%20Best" },
              { img: "/uploads/da-vinci-collection.jpg", title: "Da Vinci", sub: "Artistic graphic edition", link: "/shop?collection=Da%20Vinci%20Collection" },
            ].map((c) => (
              <Link key={c.title} href={c.link} className="group block relative overflow-hidden bg-dos-cream aspect-[4/5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.img}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dos-black/80 via-dos-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-dos-gold mb-2">{c.sub}</p>
                  <h3 className="font-display text-2xl">{c.title}</h3>
                  <span className="inline-block mt-3 text-[11px] tracking-[0.25em] uppercase border-b border-dos-gold pb-0.5 group-hover:text-dos-gold transition-colors">
                    Discover →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BESTSELLERS ========== */}
      {bestsellers.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-5 lg:px-10">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <p className="text-[11px] tracking-[0.4em] uppercase text-dos-gold">Loved by the streets</p>
                <h2 className="font-display text-3xl lg:text-4xl mt-2">Bestsellers</h2>
              </div>
              <Link href="/shop" className="text-xs tracking-[0.25em] uppercase border-b border-dos-black pb-0.5 hover:text-dos-gold hover:border-dos-gold">
                Shop All
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
              {bestsellers.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========== ABOUT DOS ========== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-5 lg:px-10 text-center">
          <p className="text-[11px] tracking-[0.4em] uppercase text-dos-gold mb-6">About D.O.S</p>
          <h2 className="font-display text-3xl lg:text-5xl leading-tight">
            A Tunisian house built on <em className="not-italic text-gradient-gold">quality, craftsmanship and purpose</em>.
          </h2>
          <p className="mt-7 text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Dammak Outfit Store — D.O.S — was founded in 2026 with a simple obsession:
            elevate Tunisian streetwear to a luxury standard. Every piece is cut from heavyweight
            320 GSM cotton, finished with specialist embroidery and built to outlive a season.
            Only the best fabrics. Only the best detail. Only the best.
          </p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { k: "Specialist", v: "Embroidery" },
              { k: "Quality", v: "Fabrics" },
              { k: "Crafted", v: "In Tunisia" },
              { k: "Est.", v: "2026" },
            ].map((b) => (
              <div key={b.v} className="border border-dos-line p-6">
                <p className="font-display text-xl text-dos-gold">{b.k}</p>
                <p className="text-[11px] tracking-[0.25em] uppercase mt-1 text-neutral-600">{b.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SOCIAL ========== */}
      <section className="py-20 bg-dos-cream/40">
        <div className="max-w-5xl mx-auto px-5 lg:px-10 text-center">
          <p className="text-[11px] tracking-[0.4em] uppercase text-dos-gold mb-4">Follow the house</p>
          <h2 className="font-display text-3xl lg:text-4xl">
            @dammak.outfit.store
          </h2>
          <p className="mt-3 text-neutral-600">
            Tag <span className="text-dos-gold">#DOSLuxury</span> for a chance to be featured.
          </p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "/uploads/dos-summer-set.jpg",
              "/uploads/only-the-best-1.jpg",
              "/uploads/only-the-best-2.jpg",
              "/uploads/da-vinci-collection.jpg",
            ].map((src, i) => (
              <div key={i} className="relative aspect-square overflow-hidden bg-dos-cream group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="Instagram" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-dos-black/0 group-hover:bg-dos-black/30 transition-colors flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="opacity-0 group-hover:opacity-100 transition-opacity" stroke="#fff" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="4" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.8" fill="#fff" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center gap-3">
            <a href="#" className="btn-outline-dark px-6 py-3 text-xs">Instagram</a>
            <a href="#" className="btn-outline-dark px-6 py-3 text-xs">TikTok</a>
            <a href="#" className="btn-outline-dark px-6 py-3 text-xs">Facebook</a>
          </div>
        </div>
      </section>
    </>
  );
}