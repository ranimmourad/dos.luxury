import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-dos-black text-white mt-24">
      {/* Top divider with gold thread */}
      <div className="h-px bg-gradient-to-r from-transparent via-dos-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Logo variant="light" />
          <p className="mt-5 text-sm text-neutral-400 leading-relaxed max-w-xs">
            D.O.S — Dammak Outfit Store. A Tunisian luxury streetwear house.
            Quality, craftsmanship, purpose.
          </p>
          <p className="mt-5 font-display italic text-dos-gold text-lg">
            Luxury in every detail.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase text-dos-gold mb-5">Shop</h4>
          <ul className="space-y-3 text-sm text-neutral-300">
            <li><Link href="/shop" className="hover:text-dos-gold transition-colors">All Products</Link></li>
            <li><Link href="/shop?collection=Summer%202026" className="hover:text-dos-gold transition-colors">Summer 2026</Link></li>
            <li><Link href="/shop?collection=Only%20The%20Best" className="hover:text-dos-gold transition-colors">Only The Best</Link></li>
            <li><Link href="/shop?collection=Da%20Vinci%20Collection" className="hover:text-dos-gold transition-colors">Da Vinci Collection</Link></li>
            <li><Link href="/shop?promo=1" className="hover:text-dos-gold transition-colors">On Sale</Link></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase text-dos-gold mb-5">Customer Care</h4>
          <ul className="space-y-3 text-sm text-neutral-300">
            <li><Link href="/contact" className="hover:text-dos-gold transition-colors">Contact Us</Link></li>
            <li><Link href="/shop" className="hover:text-dos-gold transition-colors">Size Guide</Link></li>
            <li><Link href="/shop" className="hover:text-dos-gold transition-colors">Shipping & Returns</Link></li>
            <li><Link href="/shop" className="hover:text-dos-gold transition-colors">Care Instructions</Link></li>
            <li><Link href="/admin" className="hover:text-dos-gold transition-colors">Admin</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase text-dos-gold mb-5">Get in Touch</h4>
          <ul className="space-y-3 text-sm text-neutral-300">
            <li className="flex items-start gap-2">
              <span className="text-dos-gold mt-0.5">·</span>
              <a href="tel:+21620084541" className="hover:text-dos-gold transition-colors">+216 20 084 541</a>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-dos-gold mt-0.5">·</span>
              <a href="tel:23707806" className="hover:text-dos-gold transition-colors">23 707 806</a>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-dos-gold mt-0.5">·</span>
              <a href="mailto:yassindammak820@gmail.com" className="hover:text-dos-gold transition-colors break-all">yassindammak820@gmail.com</a>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-dos-gold mt-0.5">·</span>
              <a href="https://dammak.outfit.store" target="_blank" rel="noopener" className="hover:text-dos-gold transition-colors">dammak.outfit.store</a>
            </li>
          </ul>

          {/* Social */}
          <div className="mt-6 flex gap-3">
            {["instagram", "tiktok", "facebook"].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="w-9 h-9 border border-dos-gold/40 hover:border-dos-gold hover:bg-dos-gold/10 transition-colors flex items-center justify-center"
              >
                <SocialIcon name={s} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] tracking-[0.2em] uppercase text-neutral-500">
          <p>© {new Date().getFullYear()} D.O.S — Dammak Outfit Store. All rights reserved.</p>
          <p>Est. 2026 · Tunisia</p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  const common = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none" } as const;
  if (name === "instagram")
    return (
      <svg {...common} stroke="#C9A961" strokeWidth="1.6">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="#C9A961" />
      </svg>
    );
  if (name === "tiktok")
    return (
      <svg {...common} fill="#C9A961">
        <path d="M16 3v3a4 4 0 004 4v3a7 7 0 01-4-1.3V16a5 5 0 11-5-5v3a2 2 0 102 2V3h3z" />
      </svg>
    );
  return (
    <svg {...common} fill="#C9A961">
      <path d="M13 22v-8h3l.5-4H13V7.5c0-1 .3-1.6 1.7-1.6H17V2.2C16.6 2.1 15.4 2 14.1 2 11.3 2 9.5 3.7 9.5 6.9V10H7v4h2.5v8H13z" />
    </svg>
  );
}
