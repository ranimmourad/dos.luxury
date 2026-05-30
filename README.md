# D.O.S — Luxury Streetwear

Premium e-commerce website for the Tunisian streetwear brand **D.O.S** (Dammak Outfit Store).
*Luxury in every detail.*

## Project Overview
- **Name**: D.O.S Luxury Streetwear
- **Goal**: A premium, minimal, gold-accented e-commerce experience for a Tunisian luxury streetwear brand, ready to deploy to Vercel.
- **Tech**: Next.js 15 (App Router) · React 19 · TypeScript · TailwindCSS · Vercel-ready

## URLs / Routes
| Route | Purpose |
|-------|---------|
| `/` | Home — hero, collections, bestsellers, promos, about, social |
| `/shop` | Shop grid with search, filters (size · color · category · collection · promo) and sorting |
| `/shop?collection=…` | Filter by collection |
| `/shop?promo=1` | On-sale products only |
| `/product/[slug]` | Product details with gallery, color/size/quantity selectors, related products |
| `/cart` | Full cart page with quantity controls, coupon (`DOS10` = 10% off), order summary |
| `/contact` | Contact form + phone/email/social info |
| `/admin` | Admin dashboard (demo PIN: `dos2026`) — search, add, edit, delete, multi-image upload, manage featured/promo |

A slide-out cart drawer is also available globally via the cart icon in the navbar.

## Data Architecture
- **Catalogue source**: `src/lib/products.ts` (real D.O.S collections — no fake products)
- **Storage**:
  - Products → React Context + `localStorage` (`dos_products_v1`)
  - Cart → React Context + `localStorage` (`dos_cart_v1`)
- **Image storage**: `public/uploads/` for the real provided brand photos; admin uploads are stored as data URLs alongside the product
- **Collections shipped**:
  1. **Fakhama Set** — Oversized fit · 320 GSM · 4 colors · S → XXL
  2. **Only The Best** — Oversized tee · 320 GSM · S → XXL
  3. **Da Vinci Collection** — Oversized tee · artistic graphic · 320 GSM · S → XXL

## User Guide
1. Browse the homepage to discover collections and current drops.
2. Visit **Shop**, refine with filters (collection, category, size, color, sale-only) and sort.
3. Open a product → choose color, size, quantity → **Add to Cart**.
4. Review the slide-out drawer or the full `/cart` page → apply coupon `DOS10` → checkout.
5. Admin: go to `/admin`, enter PIN `dos2026`, then add/edit/delete products and upload multiple images.

## Brand
- **Phone**: +216 20 084 541 · 23 707 806
- **Email**: yassindammak820@gmail.com
- **Website**: dammak.outfit.store

## Deployment
- **Target**: Vercel (zero-config). Run `vercel deploy` from the repo root.
- **Local dev (sandbox)**: served via PM2 + `next start` after `npm run build`.
- **Tech stack**: Next.js 15 · React 19 · TypeScript · TailwindCSS
- **Status**: ✅ Active
- **Last Updated**: 2026-05-30

## Local Development
```bash
npm install
npm run build
npm run start    # production on :3000
# or
npm run dev      # development with HMR
```
