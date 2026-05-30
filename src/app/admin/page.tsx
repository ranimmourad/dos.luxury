"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useProducts } from "@/context/ProductContext";
import { formatTND } from "@/lib/format";
import ProductForm from "@/components/admin/ProductForm";
import type { Product } from "@/lib/types";

export default function AdminPage() {
  const { products, deleteProduct, resetProducts, hydrated } = useProducts();
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"list" | "add" | "edit">("list");
  const [editing, setEditing] = useState<Product | null>(null);
  const [pin, setPin] = useState("");
  const [authed, setAuthed] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) =>
      (p.name + p.collection + p.category).toLowerCase().includes(query.toLowerCase()),
    );
  }, [products, query]);

  const stats = useMemo(
    () => ({
      total: products.length,
      featured: products.filter((p) => p.featured).length,
      promo: products.filter((p) => p.promo).length,
      bestseller: products.filter((p) => p.bestseller).length,
    }),
    [products],
  );

  if (!hydrated) {
    return <div className="py-32 text-center text-sm text-neutral-500">Loading…</div>;
  }

  // Simple PIN gate (client-side, demo)
  if (!authed) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center px-5">
        <div className="w-full max-w-sm border border-dos-line p-8 lg:p-10">
          <p className="text-[11px] tracking-[0.4em] uppercase text-dos-gold text-center">D.O.S Admin</p>
          <h1 className="font-display text-2xl text-center mt-2">Dashboard Login</h1>
          <p className="text-xs text-neutral-500 text-center mt-1">Enter admin PIN to continue</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (pin === "dos2026") setAuthed(true);
              else alert("Invalid PIN. (Demo PIN: dos2026)");
            }}
            className="mt-7 space-y-4"
          >
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Admin PIN"
              className="w-full border border-dos-line px-4 py-3 text-center tracking-[0.3em] focus:outline-none focus:border-dos-gold"
            />
            <button type="submit" className="w-full btn-gold py-3 text-xs">
              Enter Dashboard
            </button>
            <p className="text-[11px] text-neutral-400 text-center">
              Demo PIN: <span className="text-dos-gold">dos2026</span>
            </p>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-dos-cream/20 min-h-screen">
      {/* Top */}
      <div className="bg-dos-black text-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.4em] uppercase text-dos-gold">Admin</p>
            <h1 className="font-display text-3xl lg:text-4xl mt-2">D.O.S Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/" className="btn-outline-gold px-5 py-2.5 text-[11px]">
              View Site
            </Link>
            <button onClick={() => setAuthed(false)} className="btn-outline-gold px-5 py-2.5 text-[11px]">
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { k: "Total Products", v: stats.total },
            { k: "Featured", v: stats.featured },
            { k: "Promotions", v: stats.promo },
            { k: "Bestsellers", v: stats.bestseller },
          ].map((s) => (
            <div key={s.k} className="bg-white border border-dos-line p-5">
              <p className="text-[11px] tracking-[0.25em] uppercase text-neutral-500">{s.k}</p>
              <p className="font-display text-3xl mt-2 text-dos-black">{s.v}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        {mode === "list" && (
          <>
            <div className="bg-white border border-dos-line p-5 mb-5 flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[200px] relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" width="16" height="16" viewBox="0 0 20 20" fill="none">
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
                onClick={() => { resetProducts(); alert("Catalogue reset to defaults."); }}
                className="btn-outline-dark px-4 py-2.5 text-xs"
              >
                Reset to Defaults
              </button>
              <button
                onClick={() => { setEditing(null); setMode("add"); }}
                className="btn-gold px-5 py-2.5 text-xs"
              >
                + Add Product
              </button>
            </div>

            {/* Table */}
            <div className="bg-white border border-dos-line overflow-x-auto">
              <table className="w-full text-sm min-w-[800px]">
                <thead className="bg-dos-cream/40 text-[11px] tracking-[0.2em] uppercase text-neutral-600">
                  <tr>
                    <th className="text-left p-4">Product</th>
                    <th className="text-left p-4">Collection</th>
                    <th className="text-left p-4">Category</th>
                    <th className="text-left p-4">Price</th>
                    <th className="text-left p-4">Stock</th>
                    <th className="text-left p-4">Flags</th>
                    <th className="text-right p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className="border-t border-dos-line">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-14 bg-dos-cream overflow-hidden flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-medium">{p.name}</p>
                            <p className="text-[11px] text-neutral-500">/{p.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-neutral-600">{p.collection}</td>
                      <td className="p-4 text-neutral-600">{p.category}</td>
                      <td className="p-4 font-medium">{formatTND(p.price)}</td>
                      <td className="p-4">{p.stock}</td>
                      <td className="p-4">
                        <div className="flex gap-1 flex-wrap">
                          {p.featured && <Badge>Featured</Badge>}
                          {p.bestseller && <Badge>Best</Badge>}
                          {p.promo && <Badge tone="gold">Promo</Badge>}
                          {p.newDrop && <Badge tone="dark">New</Badge>}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2 justify-end">
                          <Link
                            href={`/product/${p.slug}`}
                            className="text-[11px] tracking-[0.2em] uppercase underline hover:text-dos-gold"
                            target="_blank"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => { setEditing(p); setMode("edit"); }}
                            className="text-[11px] tracking-[0.2em] uppercase underline hover:text-dos-gold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete "${p.name}"?`)) deleteProduct(p.id);
                            }}
                            className="text-[11px] tracking-[0.2em] uppercase underline text-red-600 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-10 text-center text-neutral-500">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Add / Edit */}
        {(mode === "add" || mode === "edit") && (
          <ProductForm
            initial={editing ?? undefined}
            onCancel={() => { setMode("list"); setEditing(null); }}
            onDone={() => { setMode("list"); setEditing(null); }}
          />
        )}
      </div>
    </section>
  );
}

function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "gold" | "dark" }) {
  const styles =
    tone === "gold"
      ? "bg-dos-gold text-dos-black"
      : tone === "dark"
      ? "bg-dos-black text-white"
      : "bg-dos-cream text-dos-black border border-dos-line";
  return (
    <span className={`px-2 py-0.5 text-[10px] tracking-[0.2em] uppercase ${styles}`}>{children}</span>
  );
}
