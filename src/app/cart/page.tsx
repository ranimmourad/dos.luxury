"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatTND } from "@/lib/format";
import { useState } from "react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);

  const shipping = items.length === 0 ? 0 : subtotal >= 200 ? 0 : 7;
  const discount = applied ? Math.round(subtotal * 0.1) : 0;
  const total = Math.max(0, subtotal + shipping - discount);

  return (
    <>
      {/* Header */}
      <section className="bg-dos-black text-white py-14">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <p className="text-[11px] tracking-[0.4em] uppercase text-dos-gold">Checkout</p>
          <h1 className="font-display text-4xl lg:text-5xl mt-3">Shopping Cart</h1>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          {items.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-dos-line">
              <p className="font-display text-3xl">Your cart is empty.</p>
              <p className="mt-3 text-neutral-500">Time to find your next favorite piece.</p>
              <Link href="/shop" className="inline-block mt-8 btn-gold px-8 py-4 text-xs">
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1fr_380px] gap-10">
              {/* Items table */}
              <div>
                <div className="hidden lg:grid grid-cols-[1fr_140px_140px_50px] gap-6 pb-3 border-b border-dos-line text-[11px] tracking-[0.25em] uppercase text-neutral-500">
                  <span>Product</span>
                  <span className="text-center">Quantity</span>
                  <span className="text-right">Total</span>
                  <span />
                </div>

                <ul className="divide-y divide-dos-line">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="py-6 grid grid-cols-1 lg:grid-cols-[1fr_140px_140px_50px] gap-6 items-center"
                    >
                      <div className="flex gap-4">
                        <div className="w-24 h-28 bg-dos-cream overflow-hidden flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-[11px] uppercase tracking-wider text-neutral-500 mt-1">
                            {item.color} · Size {item.size}
                          </p>
                          <p className="text-sm mt-2 lg:hidden">{formatTND(item.price)}</p>
                        </div>
                      </div>

                      <div className="lg:justify-self-center">
                        <div className="inline-flex items-center border border-dos-line">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-9 h-9 hover:bg-dos-cream"
                          >−</button>
                          <span className="w-9 h-9 flex items-center justify-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-9 h-9 hover:bg-dos-cream"
                          >+</button>
                        </div>
                      </div>

                      <div className="lg:text-right font-semibold">
                        {formatTND(item.price * item.quantity)}
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="lg:justify-self-end text-neutral-400 hover:text-dos-black self-start lg:self-center"
                        aria-label="Remove"
                      >
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                          <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex justify-between items-center">
                  <Link href="/shop" className="text-xs tracking-[0.25em] uppercase border-b border-dos-black pb-0.5 hover:text-dos-gold hover:border-dos-gold">
                    ← Continue Shopping
                  </Link>
                  <button onClick={clearCart} className="text-xs tracking-[0.25em] uppercase text-neutral-500 hover:text-dos-black">
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Summary */}
              <aside className="bg-dos-cream/40 border border-dos-line p-7 h-fit lg:sticky lg:top-28">
                <h3 className="text-sm tracking-[0.3em] uppercase font-semibold">Order Summary</h3>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium">{formatTND(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Shipping</span>
                    <span className="font-medium">{shipping === 0 ? "Free" : formatTND(shipping)}</span>
                  </div>
                  {applied && (
                    <div className="flex justify-between text-dos-gold">
                      <span>Discount (DOS10)</span>
                      <span className="font-medium">− {formatTND(discount)}</span>
                    </div>
                  )}
                </div>

                {/* Coupon */}
                <div className="mt-6">
                  <label className="text-[11px] tracking-[0.25em] uppercase text-neutral-500">Promo code</label>
                  <div className="mt-2 flex gap-2">
                    <input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="DOS10"
                      className="flex-1 border border-dos-line px-3 py-2.5 text-sm focus:outline-none focus:border-dos-gold bg-white"
                    />
                    <button
                      onClick={() => setApplied(coupon.trim().toUpperCase() === "DOS10")}
                      className="btn-outline-dark px-4 py-2.5 text-xs"
                    >
                      Apply
                    </button>
                  </div>
                  {applied && (
                    <p className="text-[11px] text-dos-gold mt-2">✓ Code applied — 10% off</p>
                  )}
                </div>

                <div className="border-t border-dos-line my-6" />

                <div className="flex justify-between items-baseline">
                  <span className="text-sm tracking-[0.3em] uppercase font-semibold">Total</span>
                  <span className="text-2xl font-semibold">{formatTND(total)}</span>
                </div>

                <button
                  onClick={() => alert("Checkout coming soon — please contact us at +216 20 084 541 to confirm your order.")}
                  className="mt-6 w-full btn-gold py-4 text-xs"
                >
                  Proceed to Checkout
                </button>

                <p className="mt-4 text-[11px] text-center text-neutral-500">
                  Free shipping on orders over 200 TND.
                </p>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
