"use client";

import { useState, useRef } from "react";
import { useProducts } from "@/context/ProductContext";
import type { Product, Size } from "@/lib/types";

const ALL_SIZES: Size[] = ["S", "M", "L", "XL", "XXL"];
const CATS: Product["category"][] = ["Sets", "T-Shirts", "Shorts"];

const PRESET_COLORS = [
  { name: "Black", hex: "#0A0A0A" },
  { name: "White", hex: "#F7F4EE" },
  { name: "Beige", hex: "#D6C4A8" },
  { name: "Cream", hex: "#F2EAD8" },
  { name: "Olive Green", hex: "#5C6A4B" },
  { name: "Green", hex: "#5C6A4B" },
  { name: "Gold", hex: "#C9A961" },
  { name: "Navy", hex: "#1B2A41" },
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ProductForm({
  initial,
  onCancel,
  onDone,
}: {
  initial?: Product;
  onCancel: () => void;
  onDone: () => void;
}) {
  const { addProduct, updateProduct } = useProducts();
  const isEdit = !!initial;
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<Product>(
    initial ?? {
      id: `prod_${Date.now()}`,
      slug: "",
      name: "",
      collection: "",
      description: "",
      details: [],
      price: 0,
      compareAtPrice: undefined,
      images: [],
      colors: [],
      sizes: ["S", "M", "L", "XL", "XXL"],
      gsm: 320,
      featured: false,
      bestseller: false,
      promo: false,
      newDrop: true,
      stock: 0,
      category: "T-Shirts",
      createdAt: new Date().toISOString().slice(0, 10),
    },
  );
  const [detailsText, setDetailsText] = useState(form.details.join("\n"));

  const update = <K extends keyof Product>(k: K, v: Product[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggleSize = (s: Size) =>
    update("sizes", form.sizes.includes(s) ? form.sizes.filter((x) => x !== s) : [...form.sizes, s]);

  const toggleColor = (c: { name: string; hex: string }) => {
    const exists = form.colors.find((x) => x.name === c.name);
    update("colors", exists ? form.colors.filter((x) => x.name !== c.name) : [...form.colors, c]);
  };

  // Handle multiple image uploads as data URLs (stored in localStorage with the product)
  const onFiles = async (files: FileList | null) => {
    if (!files) return;
    const readers = Array.from(files).map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const r = new FileReader();
          r.onload = () => resolve(r.result as string);
          r.onerror = reject;
          r.readAsDataURL(file);
        }),
    );
    const urls = await Promise.all(readers);
    update("images", [...form.images, ...urls]);
  };

  const removeImage = (i: number) =>
    update("images", form.images.filter((_, idx) => idx !== i));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Name is required.");
    if (form.images.length === 0) return alert("Please upload at least one image.");
    if (form.colors.length === 0) return alert("Please select at least one color.");
    if (form.sizes.length === 0) return alert("Please select at least one size.");

    const slug = form.slug || slugify(form.name);
    const final: Product = { ...form, slug, details: detailsText.split("\n").map((s) => s.trim()).filter(Boolean) };

    if (isEdit) updateProduct(final.id, final);
    else addProduct(final);
    onDone();
  };

  return (
    <form onSubmit={submit} className="bg-white border border-dos-line">
      <div className="p-6 lg:p-8 border-b border-dos-line flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-dos-gold">{isEdit ? "Edit Product" : "Add New Product"}</p>
          <h2 className="font-display text-2xl mt-1">{form.name || "Untitled product"}</h2>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onCancel} className="btn-outline-dark px-5 py-2.5 text-xs">
            Cancel
          </button>
          <button type="submit" className="btn-gold px-7 py-2.5 text-xs">
            {isEdit ? "Save Changes" : "Create Product"}
          </button>
        </div>
      </div>

      <div className="p-6 lg:p-8 grid lg:grid-cols-[1.4fr_1fr] gap-8">
        {/* Left */}
        <div className="space-y-6">
          <Group title="General">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Product Name">
                <input className="adm-input" value={form.name} onChange={(e) => update("name", e.target.value)} required />
              </Field>
              <Field label="Slug (URL)">
                <input
                  className="adm-input"
                  value={form.slug}
                  onChange={(e) => update("slug", slugify(e.target.value))}
                  placeholder="auto-generated from name"
                />
              </Field>
              <Field label="Collection">
                <input className="adm-input" value={form.collection} onChange={(e) => update("collection", e.target.value)} placeholder="e.g. Summer 2026" />
              </Field>
              <Field label="Category">
                <select className="adm-input" value={form.category} onChange={(e) => update("category", e.target.value as Product["category"])}>
                  {CATS.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Description">
              <textarea
                rows={4}
                className="adm-input resize-y"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
              />
            </Field>
            <Field label="Product Details (one per line)">
              <textarea
                rows={5}
                className="adm-input resize-y font-mono text-xs"
                value={detailsText}
                onChange={(e) => setDetailsText(e.target.value)}
                placeholder="Oversized fit&#10;320 GSM heavyweight cotton&#10;Premium embroidery"
              />
            </Field>
          </Group>

          <Group title="Pricing & Inventory">
            <div className="grid sm:grid-cols-4 gap-4">
              <Field label="Price (TND)">
                <input type="number" min={0} className="adm-input" value={form.price} onChange={(e) => update("price", parseFloat(e.target.value) || 0)} required />
              </Field>
              <Field label="Compare At (optional)">
                <input
                  type="number" min={0}
                  className="adm-input"
                  value={form.compareAtPrice ?? ""}
                  onChange={(e) => update("compareAtPrice", e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </Field>
              <Field label="Stock">
                <input type="number" min={0} className="adm-input" value={form.stock} onChange={(e) => update("stock", parseInt(e.target.value) || 0)} />
              </Field>
              <Field label="GSM">
                <input type="number" min={0} className="adm-input" value={form.gsm} onChange={(e) => update("gsm", parseInt(e.target.value) || 0)} />
              </Field>
            </div>
          </Group>

          <Group title="Variants">
            <Field label="Sizes">
              <div className="flex flex-wrap gap-2">
                {ALL_SIZES.map((s) => (
                  <button
                    type="button" key={s} onClick={() => toggleSize(s)}
                    className={`min-w-[44px] px-3 py-2 text-xs border transition-colors ${
                      form.sizes.includes(s) ? "border-dos-black bg-dos-black text-white" : "border-dos-line hover:border-dos-black"
                    }`}
                  >{s}</button>
                ))}
              </div>
            </Field>
            <Field label="Colors">
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((c) => {
                  const active = !!form.colors.find((x) => x.name === c.name);
                  return (
                    <button
                      type="button" key={c.name} onClick={() => toggleColor(c)}
                      title={c.name}
                      className={`flex items-center gap-2 border px-3 py-1.5 text-xs transition-colors ${
                        active ? "border-dos-gold bg-dos-cream" : "border-dos-line hover:border-dos-black"
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-dos-line" style={{ background: c.hex }} />
                      {c.name}
                    </button>
                  );
                })}
              </div>
            </Field>
          </Group>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <Group title="Images">
            <div
              className="border-2 border-dashed border-dos-line p-6 text-center cursor-pointer hover:border-dos-gold hover:bg-dos-cream/30 transition-colors"
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); onFiles(e.dataTransfer.files); }}
            >
              <svg className="mx-auto mb-2" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A961" strokeWidth="1.4">
                <path d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
              </svg>
              <p className="text-sm">Click or drop images here</p>
              <p className="text-[11px] text-neutral-500 mt-1">Multiple files supported · JPG, PNG, WEBP</p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => onFiles(e.target.files)}
              />
            </div>

            {form.images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {form.images.map((img, i) => (
                  <div key={i} className="relative aspect-square bg-dos-cream overflow-hidden border border-dos-line">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    {i === 0 && (
                      <span className="absolute top-1 left-1 bg-dos-gold text-dos-black text-[9px] tracking-widest uppercase px-1.5 py-0.5">
                        Main
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 w-6 h-6 bg-white/95 hover:bg-white text-dos-black flex items-center justify-center"
                      aria-label="Remove"
                    >
                      <svg width="10" height="10" viewBox="0 0 20 20" fill="none">
                        <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Group>

          <Group title="Visibility & Flags">
            {[
              { k: "featured", label: "Featured on homepage" },
              { k: "bestseller", label: "Bestseller" },
              { k: "promo", label: "On promotion / sale" },
              { k: "newDrop", label: "New drop" },
            ].map((f) => (
              <label key={f.k} className="flex items-center justify-between py-2 border-b border-dos-line last:border-0">
                <span className="text-sm">{f.label}</span>
                <input
                  type="checkbox"
                  checked={Boolean((form as unknown as Record<string, unknown>)[f.k])}
                  onChange={(e) => update(f.k as keyof Product, e.target.checked as never)}
                  className="accent-dos-gold w-4 h-4"
                />
              </label>
            ))}
          </Group>
        </div>
      </div>

      <style jsx global>{`
        .adm-input {
          width: 100%;
          border: 1px solid #e5e5e5;
          background: #fff;
          padding: 10px 12px;
          font-size: 14px;
          outline: none;
          transition: border-color .2s;
        }
        .adm-input:focus { border-color: #c9a961; }
      `}</style>
    </form>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-dos-line">
      <div className="px-5 py-3 border-b border-dos-line bg-dos-cream/40">
        <h3 className="text-[11px] tracking-[0.3em] uppercase font-semibold">{title}</h3>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.25em] uppercase text-neutral-500">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
