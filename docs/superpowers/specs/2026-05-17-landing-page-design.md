# Landing Page — AI Store Design Spec

**Date:** 2026-05-17
**Status:** Approved
**Scope:** Landing page only (Admin CMS is a separate future spec)

---

## Overview

Halaman landing page single-page untuk toko online AI Tools. Pengguna dapat melihat katalog produk, mencari dan memfilter, melihat detail produk, menambahkan ke keranjang, dan melanjutkan ke checkout manual via WhatsApp.

Data produk menggunakan hardcoded mock data. Prisma/database akan diintegrasikan di iterasi berikutnya.

---

## Routing

Satu route: `/` (Next.js App Router, `src/app/page.tsx`).

Tidak ada route tambahan untuk landing page ini.

---

## File Structure

```
src/
├── app/
│   └── page.tsx                        ← landing page (replace starter template)
├── components/
│   ├── landing/
│   │   ├── navbar.tsx                  ← sticky navbar
│   │   ├── hero-section.tsx            ← hero + CTA
│   │   ├── info-section.tsx            ← tagline + jam operasional
│   │   ├── catalog-section.tsx         ← search + filter + product grid
│   │   ├── product-card.tsx            ← card individual produk
│   │   ├── product-detail-modal.tsx    ← modal detail produk
│   │   └── cart-drawer.tsx             ← drawer keranjang + invoice view
│   └── ui/                             ← existing components, reused
├── data/
│   └── products.ts                     ← mock product data (~8–10 produk)
├── store/
│   └── cart-store.ts                   ← Zustand cart state
└── types/
    └── product.ts                      ← Product, PriceVariant, Category types
```

---

## Data Models

### `src/types/product.ts`

```ts
type Category =
  | "semua"
  | "ai-assistant"
  | "ai-image"
  | "ai-coding"
  | "productivity"
  | "design"
  | "writing"

interface PriceVariant {
  label: string   // e.g. "1 Bulan", "3 Bulan", "Pro Plan"
  price: number   // in IDR
}

interface Product {
  id: string
  name: string
  slug: string
  category: Exclude<Category, "semua">
  description: string
  thumbnails: string[]      // 1–3 image URLs
  variants: PriceVariant[]  // 1–6 price options
  badge?: string            // optional: "Terlaris", "Baru", etc.
}
```

### Cart State (`src/store/cart-store.ts`)

```ts
interface CartItem {
  productId: string
  productName: string
  variantLabel: string
  price: number
  quantity: number   // always 1 per variant selection
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  invoiceView: boolean
  addItem: (item: CartItem) => void
  removeItem: (productId: string, variantLabel: string) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  goToInvoice: () => void
  backToCart: () => void
}
```

---

## Component Specifications

### Navbar (`navbar.tsx`)

- **Position:** `sticky top-0 z-50` dengan backdrop blur
- **Left:** Nama toko / logo teks
- **Center (desktop):** Anchor links → `#hero`, `#cara-beli`, `#katalog` (smooth scroll)
- **Right:** Cart icon dengan badge jumlah item + theme toggle
- **Mobile:** Anchor links disembunyikan, hanya logo + cart icon + theme toggle

### Hero Section (`#hero`)

- Headline besar: **"Belanja produk digital dengan tampilan lebih rapi, harga jelas, dan alur checkout yang mudah seperti marketplace."**
- Subtext alur pembelian: `🧾 Alur pembelian: checkout → invoice muncul → screenshot invoice → klik tombol WhatsApp admin untuk konfirmasi manual`
- CTA button: "Lihat Katalog" → smooth scroll ke `#katalog`

### Info Section (`#cara-beli`)

- **Tagline strip:** `Premium AI Tools terpercaya • Proses cepat • Support ramah`
- **Card jam operasional:**
  - Judul: "Jam Operasional"
  - Waktu: `08.00 – 22.00 WIB`
  - Keterangan: "Konfirmasi pesanan dan pengecekan pembayaran diproses admin pada jam operasional."

### Catalog Section (`#katalog`)

- **Intro text:** "Pilih produk, cek paket, masukkan ke keranjang, lalu checkout dengan tampilan yang lebih familiar dan nyaman."
- **Search input:** filter real-time berdasarkan nama produk
- **Category filter:** pill/tab horizontal
  - Semua Produk | AI Assistant | AI Image Generator | AI Coding | Productivity | Design | Writing
- **Product grid:**
  - 2 kolom di mobile, 3 kolom di desktop
  - Setiap card: thumbnail, nama, badge (opsional), "Mulai dari Rp X", tombol "Lihat Detail"

### Product Detail Modal (`product-detail-modal.tsx`)

- Dipanggil saat user klik "Lihat Detail" pada product card
- **Thumbnail carousel:** 1–3 gambar, navigasi klik kiri/kanan
- **Nama produk + deskripsi lengkap**
- **Variant selector:** button group (1–6 opsi), satu bisa dipilih
- **Tombol "Tambah ke Keranjang":** disabled jika belum ada variant terpilih
- Setelah tambah: toast sukses, modal bisa ditutup

### Cart Drawer (`cart-drawer.tsx`)

Slide dari kanan. Dua state internal yang di-switch:

**State 1 — Ringkasan Pesanan:**
```
Detail Pesanan
─────────────────────────────
[Nama Produk]
[Variant Label]              [Hapus]
─────────────────────────────
Subtotal                 Rp X
Total Bayar:             Rp X
─────────────────────────────
[Tombol: Checkout]
```

**State 2 — Invoice:**
```
🧾 Invoice #INV-YYYYMMDD-XXXX
─────────────────────────────
[List item + variant + harga]
─────────────────────────────
Total Bayar:             Rp X
─────────────────────────────
[Tombol: Konfirmasi via WhatsApp]
[← Kembali ke Keranjang]
```

- Invoice number: generated dari timestamp saat checkout diklik
- WhatsApp button: membuka `https://wa.me/<nomor>?text=<pesan otomatis berisi invoice>`
- Nomor WA admin: hardcoded di `cart-drawer.tsx` (sementara)

---

## State Management

| State | Lokasi | Keterangan |
|---|---|---|
| Cart items | `cart-store.ts` (Zustand) | Persisted in memory |
| Drawer open/close | `cart-store.ts` | `isOpen` boolean |
| Invoice view | `cart-store.ts` | `invoiceView` boolean |
| Product modal | local state di `catalog-section.tsx` | `selectedProduct` |
| Search query | local state di `catalog-section.tsx` | `searchQuery` string |
| Active category | local state di `catalog-section.tsx` | `activeCategory` |

---

## Theme

- Light + dark mode toggle via existing `theme-toggle` component
- Menggunakan Tailwind v4 CSS variables yang sudah ada di project

---

## Constraints & Decisions

- **Data:** Hardcoded mock di `src/data/products.ts`. Tidak ada API call.
- **Images:** Menggunakan placeholder images (picsum/placehold.co) untuk mock data.
- **WhatsApp number:** Hardcoded di `cart-drawer.tsx`. Akan dipindah ke config/CMS di iterasi berikutnya.
- **No authentication:** Landing page adalah public, tidak ada login.
- **No payment gateway:** Alur pembayaran manual via WhatsApp + screenshot.
- **Cart tidak persist:** Refresh halaman = cart kosong (cukup untuk MVP).

---

## Out of Scope (Fase Berikutnya)

- Admin CMS (CRUD produk, kategori, order management)
- Database integration (Prisma + Neon Postgres)
- Real image upload
- Payment gateway otomatis
- Order tracking
