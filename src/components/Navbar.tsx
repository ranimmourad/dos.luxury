"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?collection=Summer%202026", label: "Summer 2026" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-dos-line"
          : "bg-white border-b border-dos-line"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10 h-16 lg:h-20 flex items-center justify-between">
        {/* Mobile menu */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          className="lg:hidden w-9 h-9 -ml-2 flex items-center justify-center"
        >
          <svg
            width="20" height="20" viewBox="0 0 20 20" fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mobileOpen ? (
              <>
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
              </>
            ) : (
              <>
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" />
              </>
            )}
          </svg>
        </button>

        {/* Logo */}
        <Link href="/" className="lg:flex-none">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => {
            const active = pathname === l.href.split("?")[0];
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[12px] tracking-[0.25em] uppercase font-medium transition-colors ${
                  active ? "text-dos-black" : "text-neutral-500 hover:text-dos-black"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3 lg:gap-5">
          <Link
            href="/shop"
            aria-label="Search"
            className="hidden sm:flex w-9 h-9 items-center justify-center hover:text-dos-gold transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
              <path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Link>
          <Link
            href="/admin"
            aria-label="Admin"
            className="hidden md:flex text-[11px] tracking-[0.25em] uppercase text-neutral-500 hover:text-dos-black"
          >
            Admin
          </Link>
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative w-9 h-9 flex items-center justify-center hover:text-dos-gold transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 6h12l-1.2 9.4a1 1 0 01-1 .9H6.2a1 1 0 01-1-.9L4 6zM7 6V4.5a3 3 0 016 0V6"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-dos-gold text-dos-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-dos-line bg-white">
          <nav className="px-5 py-4 flex flex-col">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="py-3 text-[13px] tracking-[0.25em] uppercase border-b border-dos-line/60 last:border-0"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="py-3 text-[13px] tracking-[0.25em] uppercase text-dos-gold"
            >
              Admin Dashboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
