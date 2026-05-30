"use client";

import { useCart } from "@/context/CartContext";
import { formatTND } from "@/lib/format";
import Link from "next/link";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden={!isOpen}
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-dos-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-white shadow-xl flex flex-col transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-dos-line flex items-center justify-between">
          <div>
            <h3 className="text-sm tracking-[0.25em] uppercase font-semibold">
              Your Cart
            </h3>
            <p className="text-[11px] text-neutral-500 mt-0.5">
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="w-9 h-9 flex items-center justify-center hover:text-dos-gold"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 border border-dos-gold/40 rounded-full flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 7h16l-1.5 11.3a2 2 0 01-2 1.7h-9a2 2 0 01-2-1.7L4 7zM8 7V5a4 4 0 018 0v2"
                    stroke="#C9A961" strokeWidth="1.4" strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-sm text-neutral-600 mb-1">Your cart is empty</p>
              <p className="text-xs text-neutral-400 mb-6">Discover our latest pieces</p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="btn-outline-dark px-6 py-3 text-xs"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-dos-line">
              {items.map((item) => (
                <li key={item.id} className="py-4 flex gap-4">
                  <div className="w-20 h-24 flex-shrink-0 bg-dos-cream overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium leading-tight">{item.name}</h4>
                    <p className="text-[11px] text-neutral-500 mt-0.5 uppercase tracking-wider">
                      {item.color} · Size {item.size}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-dos-line">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 text-sm hover:bg-dos-cream"
                          aria-label="Decrease"
                        >−</button>
                        <span className="w-7 h-7 flex items-center justify-center text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 text-sm hover:bg-dos-cream"
                          aria-label="Increase"
                        >+</button>
                      </div>
                      <p className="text-sm font-semibold">
                        {formatTND(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove"
                    className="text-neutral-400 hover:text-dos-black self-start"
                  >
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                      <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-dos-line px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-[0.25em] uppercase text-neutral-600">Subtotal</span>
              <span className="text-base font-semibold">{formatTND(subtotal)}</span>
            </div>
            <p className="text-[11px] text-neutral-500">
              Shipping & taxes calculated at checkout.
            </p>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full text-center btn-gold py-3.5 text-xs"
            >
              View Cart & Checkout
            </Link>
            <Link
              href="/shop"
              onClick={closeCart}
              className="block w-full text-center btn-outline-dark py-3 text-xs"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
