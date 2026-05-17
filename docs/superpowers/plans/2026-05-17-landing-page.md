# Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page landing page for an AI Tools online store with sticky navbar, hero, info section, product catalog with search/filter, product detail modal, and a cart drawer with invoice view.

**Architecture:** Single Next.js App Router page (`/`) composed of focused client components. Data is hardcoded mock. Cart state lives in Zustand. The cart drawer uses Radix UI Dialog positioned as a right-side sheet with two internal views (cart summary → invoice).

**Tech Stack:** Next.js 16, React 19, Tailwind v4, Zustand + Immer, Radix UI Dialog (`@radix-ui/react-dialog`), lucide-react, react-hot-toast, next/image.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `next.config.ts` | Modify | Allow picsum.photos for `next/image` |
| `src/types/product.ts` | Create | `Product`, `PriceVariant`, `Category` types |
| `src/data/products.ts` | Create | 10 hardcoded mock products |
| `src/store/cart-store.ts` | Create | Zustand cart state (items, drawer open, invoice view) |
| `src/store/index.ts` | Modify | Re-export `useCartStore` |
| `src/components/landing/navbar.tsx` | Create | Sticky navbar with anchor links, cart icon, theme toggle |
| `src/components/landing/hero-section.tsx` | Create | Hero headline + purchase flow explainer + CTA |
| `src/components/landing/info-section.tsx` | Create | Tagline strip + operating hours card |
| `src/components/landing/product-card.tsx` | Create | Product thumbnail, name, min price, "Lihat Detail" button |
| `src/components/landing/product-detail-modal.tsx` | Create | Thumbnail carousel, description, variant selector, add to cart |
| `src/components/landing/cart-drawer.tsx` | Create | Right-side drawer with CartView and InvoiceView |
| `src/components/landing/catalog-section.tsx` | Create | Search + category filter + product grid + wires modal |
| `src/app/page.tsx` | Modify | Compose all sections, replace starter template |

---

## Task 1: Foundation — Config, Types, Mock Data

**Files:**
- Modify: `next.config.ts`
- Create: `src/types/product.ts`
- Create: `src/data/products.ts`

- [ ] **Step 1: Configure next/image to allow picsum.photos**

Replace the contents of `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 2: Create product types**

Create `src/types/product.ts`:

```ts
export type Category =
  | "semua"
  | "ai-assistant"
  | "ai-image"
  | "ai-coding"
  | "productivity"
  | "design"
  | "writing";

export interface PriceVariant {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Exclude<Category, "semua">;
  description: string;
  thumbnails: string[];  // 1–3 image URLs
  variants: PriceVariant[];  // 1–6 price options
  badge?: string;
}
```

- [ ] **Step 3: Create mock product data**

Create `src/data/products.ts`:

```ts
import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "chatgpt-plus",
    name: "ChatGPT Plus Privat",
    slug: "chatgpt-plus",
    category: "ai-assistant",
    badge: "Terlaris",
    description:
      "Akses ChatGPT-4o dengan kapasitas penuh. Tidak dibagi dengan pengguna lain. Cocok untuk produktivitas harian, coding, analisis dokumen, dan kreativitas. Proses aktivasi cepat, support 24 jam.",
    thumbnails: [
      "https://picsum.photos/seed/chatgpt1/800/450",
      "https://picsum.photos/seed/chatgpt2/800/450",
    ],
    variants: [
      { label: "1 Bulan", price: 299000 },
      { label: "3 Bulan", price: 849000 },
    ],
  },
  {
    id: "claude-pro",
    name: "Claude Pro Privat",
    slug: "claude-pro",
    category: "ai-assistant",
    description:
      "Claude 3.5 Sonnet & Claude 3 Opus dengan kuota diprioritaskan. Ideal untuk penulisan panjang, analisis mendalam, dan coding. Akun privat, tidak shared.",
    thumbnails: [
      "https://picsum.photos/seed/claude1/800/450",
      "https://picsum.photos/seed/claude2/800/450",
      "https://picsum.photos/seed/claude3/800/450",
    ],
    variants: [
      { label: "1 Bulan", price: 249000 },
      { label: "3 Bulan", price: 699000 },
    ],
  },
  {
    id: "perplexity-pro",
    name: "Perplexity Pro",
    slug: "perplexity-pro",
    category: "ai-assistant",
    description:
      "Search AI terbaik dengan akses ke GPT-4 dan Claude. Cocok untuk riset, fact-checking, dan jawaban real-time dari internet. Unlimited Pro Search.",
    thumbnails: [
      "https://picsum.photos/seed/perplexity1/800/450",
    ],
    variants: [
      { label: "1 Bulan", price: 199000 },
      { label: "1 Tahun", price: 1999000 },
    ],
  },
  {
    id: "midjourney",
    name: "Midjourney",
    slug: "midjourney",
    category: "ai-image",
    badge: "Populer",
    description:
      "Buat gambar AI berkualitas tinggi dengan Midjourney. Tersedia dalam tiga paket sesuai kebutuhan. Cocok untuk desainer, konten kreator, dan seniman digital.",
    thumbnails: [
      "https://picsum.photos/seed/midjourney1/800/450",
      "https://picsum.photos/seed/midjourney2/800/450",
    ],
    variants: [
      { label: "Basic (200 img/bln)", price: 149000 },
      { label: "Standard (unlmt relax)", price: 299000 },
      { label: "Pro (unlmt fast)", price: 599000 },
    ],
  },
  {
    id: "adobe-firefly",
    name: "Adobe Firefly Premium",
    slug: "adobe-firefly",
    category: "ai-image",
    description:
      "Generate gambar AI berkualitas komersial dengan Adobe Firefly. Terintegrasi dengan ekosistem Adobe. Aman digunakan untuk konten komersial.",
    thumbnails: [
      "https://picsum.photos/seed/firefly1/800/450",
      "https://picsum.photos/seed/firefly2/800/450",
    ],
    variants: [
      { label: "1 Bulan", price: 199000 },
      { label: "3 Bulan", price: 549000 },
    ],
  },
  {
    id: "blackbox-ai",
    name: "BlackBox AI Pro",
    slug: "blackbox-ai",
    category: "ai-coding",
    description:
      "AI coding assistant dengan autocomplete cerdas, code search, dan chat. Mendukung 20+ bahasa pemrograman. Tingkatkan produktivitas coding hingga 3x lebih cepat.",
    thumbnails: [
      "https://picsum.photos/seed/blackbox1/800/450",
    ],
    variants: [
      { label: "1 Bulan", price: 89000 },
      { label: "2 Bulan", price: 169000 },
      { label: "3 Bulan", price: 249000 },
    ],
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    slug: "github-copilot",
    category: "ai-coding",
    description:
      "AI pair programmer dari GitHub. Autocomplete kode, generate fungsi dari komentar, dan chat AI langsung di VS Code. Mendukung semua bahasa populer.",
    thumbnails: [
      "https://picsum.photos/seed/copilot1/800/450",
      "https://picsum.photos/seed/copilot2/800/450",
    ],
    variants: [
      { label: "1 Bulan", price: 129000 },
      { label: "1 Tahun", price: 1499000 },
    ],
  },
  {
    id: "notion-ai",
    name: "Notion AI",
    slug: "notion-ai",
    category: "productivity",
    badge: "Baru",
    description:
      "Notion lengkap dengan AI terintegrasi. Draft tulisan, rangkum catatan, terjemahkan, dan analisis data langsung di workspace Notion kamu. Plus semua fitur Notion Pro.",
    thumbnails: [
      "https://picsum.photos/seed/notion1/800/450",
      "https://picsum.photos/seed/notion2/800/450",
    ],
    variants: [
      { label: "1 Bulan", price: 119000 },
      { label: "3 Bulan", price: 339000 },
      { label: "1 Tahun", price: 1199000 },
    ],
  },
  {
    id: "canva-pro",
    name: "Canva Pro",
    slug: "canva-pro",
    category: "design",
    description:
      "Desain profesional dengan template premium, Magic AI, background remover, Brand Kit, dan 100+ juta aset. Akun privat tidak shared.",
    thumbnails: [
      "https://picsum.photos/seed/canva1/800/450",
      "https://picsum.photos/seed/canva2/800/450",
      "https://picsum.photos/seed/canva3/800/450",
    ],
    variants: [
      { label: "1 Bulan", price: 99000 },
      { label: "3 Bulan", price: 279000 },
      { label: "1 Tahun", price: 899000 },
    ],
  },
  {
    id: "grammarly-premium",
    name: "Grammarly Premium",
    slug: "grammarly-premium",
    category: "writing",
    description:
      "Koreksi grammar, gaya penulisan, plagiarism checker, dan saran penulisan AI. Cocok untuk pelajar, profesional, dan konten kreator berbahasa Inggris.",
    thumbnails: [
      "https://picsum.photos/seed/grammarly1/800/450",
      "https://picsum.photos/seed/grammarly2/800/450",
    ],
    variants: [
      { label: "1 Bulan", price: 179000 },
      { label: "3 Bulan", price: 499000 },
      { label: "1 Tahun", price: 1699000 },
    ],
  },
];
```

- [ ] **Step 4: Verify dev server starts without errors**

Run: `npm run dev`
Expected: Compiles successfully, no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add next.config.ts src/types/product.ts src/data/products.ts
git commit -m "feat: add product types, mock data, and image domain config"
```

---

## Task 2: Cart Store

**Files:**
- Create: `src/store/cart-store.ts`
- Modify: `src/store/index.ts`

- [ ] **Step 1: Create cart store**

Create `src/store/cart-store.ts`:

```ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface CartItem {
  productId: string;
  productName: string;
  variantLabel: string;
  price: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  invoiceView: boolean;
  invoiceNumber: string | null;
}

interface CartActions {
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantLabel: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  goToInvoice: () => void;
  backToCart: () => void;
}

export const useCartStore = create<CartState & CartActions>()(
  immer((set) => ({
    items: [],
    isOpen: false,
    invoiceView: false,
    invoiceNumber: null,

    addItem: (item) =>
      set((state) => {
        const exists = state.items.find(
          (i) => i.productId === item.productId && i.variantLabel === item.variantLabel
        );
        if (!exists) state.items.push(item);
      }),

    removeItem: (productId, variantLabel) =>
      set((state) => {
        state.items = state.items.filter(
          (i) => !(i.productId === productId && i.variantLabel === variantLabel)
        );
      }),

    clearCart: () =>
      set((state) => {
        state.items = [];
      }),

    openCart: () =>
      set((state) => {
        state.isOpen = true;
      }),

    closeCart: () =>
      set((state) => {
        state.isOpen = false;
        state.invoiceView = false;
        state.invoiceNumber = null;
      }),

    goToInvoice: () =>
      set((state) => {
        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        const rand = Math.floor(1000 + Math.random() * 9000);
        state.invoiceNumber = `INV-${dateStr}-${rand}`;
        state.invoiceView = true;
      }),

    backToCart: () =>
      set((state) => {
        state.invoiceView = false;
        state.invoiceNumber = null;
      }),
  }))
);
```

- [ ] **Step 2: Re-export from store index**

Edit `src/store/index.ts`, add the cart store export:

```ts
export { useAuthStore } from "./auth-store";
export { useUIStore } from "./ui-store";
export { useCartStore } from "./cart-store";
export type { CartItem } from "./cart-store";
```

- [ ] **Step 3: Verify no TypeScript errors**

Run: `npm run dev`
Expected: Compiles successfully.

- [ ] **Step 4: Commit**

```bash
git add src/store/cart-store.ts src/store/index.ts
git commit -m "feat: add cart store with drawer and invoice state"
```

---

## Task 3: Navbar

**Files:**
- Create: `src/components/landing/navbar.tsx`

- [ ] **Step 1: Create the navbar**

Create `src/components/landing/navbar.tsx`:

```tsx
"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useCartStore } from "@/store/cart-store";

const navLinks = [
  { label: "Beranda", href: "#hero" },
  { label: "Cara Beli", href: "#cara-beli" },
  { label: "Katalog", href: "#katalog" },
];

export function Navbar() {
  const { items, openCart } = useCartStore();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <span className="text-base font-bold text-foreground">AI Store</span>

        {/* Desktop nav links */}
        <nav className="hidden gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side: theme toggle + cart */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            onClick={openCart}
            className="relative"
            prefix={<ShoppingCart className="h-4 w-4" />}
          >
            <span className="hidden sm:inline">Keranjang</span>
            {items.length > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {items.length}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify by temporarily importing in page.tsx**

Add `import { Navbar } from "@/components/landing/navbar";` and `<Navbar />` to `src/app/page.tsx`, run `npm run dev`, confirm navbar appears at top and cart icon shows.

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/navbar.tsx
git commit -m "feat: add sticky navbar with cart icon and theme toggle"
```

---

## Task 4: Hero Section

**Files:**
- Create: `src/components/landing/hero-section.tsx`

- [ ] **Step 1: Create the hero section**

Create `src/components/landing/hero-section.tsx`:

```tsx
"use client";

import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToCatalog = () => {
    document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="py-20 text-center">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
          Belanja produk digital dengan tampilan lebih rapi, harga jelas, dan
          alur checkout yang mudah seperti marketplace.
        </h1>

        <div className="mx-auto mt-6 max-w-xl rounded-xl border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
          <span className="mr-1">🧾</span>
          <strong className="text-foreground">Alur pembelian:</strong> checkout
          → invoice muncul → screenshot invoice → klik tombol WhatsApp admin
          untuk konfirmasi manual
        </div>

        <div className="mt-8">
          <Button
            size="lg"
            suffix={<ArrowDown className="h-4 w-4" />}
            onClick={scrollToCatalog}
          >
            Lihat Katalog
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/hero-section.tsx
git commit -m "feat: add hero section"
```

---

## Task 5: Info Section

**Files:**
- Create: `src/components/landing/info-section.tsx`

- [ ] **Step 1: Create the info section**

Create `src/components/landing/info-section.tsx`:

```tsx
import { Clock } from "lucide-react";

export function InfoSection() {
  return (
    <section id="cara-beli" className="border-y border-border bg-muted/40 py-12">
      <div className="mx-auto max-w-6xl px-4">
        {/* Tagline */}
        <p className="text-center text-sm font-medium text-muted-foreground">
          Premium AI Tools terpercaya • Proses cepat • Support ramah
        </p>

        {/* Operating hours card */}
        <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-semibold text-foreground">Jam Operasional</span>
          </div>
          <p className="text-2xl font-bold text-primary">08.00 – 22.00 WIB</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Konfirmasi pesanan dan pengecekan pembayaran diproses admin pada jam
            operasional.
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/info-section.tsx
git commit -m "feat: add info section with tagline and operating hours"
```

---

## Task 6: Product Card

**Files:**
- Create: `src/components/landing/product-card.tsx`

- [ ] **Step 1: Create the product card**

Create `src/components/landing/product-card.tsx`:

```tsx
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
}

export function ProductCard({ product, onViewDetail }: ProductCardProps) {
  const minPrice = Math.min(...product.variants.map((v) => v.price));

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={product.thumbnails[0]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, 33vw"
        />
        {product.badge && (
          <div className="absolute left-2 top-2">
            <Badge variant="warning">{product.badge}</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-foreground">
          {product.name}
        </h3>

        <p className="mt-auto text-xs text-muted-foreground">
          Mulai dari{" "}
          <span className="font-semibold text-foreground">
            Rp {minPrice.toLocaleString("id-ID")}
          </span>
        </p>

        <Button
          size="sm"
          variant="outline"
          className="w-full"
          onClick={() => onViewDetail(product)}
        >
          Lihat Detail
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/product-card.tsx
git commit -m "feat: add product card component"
```

---

## Task 7: Product Detail Modal

**Files:**
- Create: `src/components/landing/product-detail-modal.tsx`

- [ ] **Step 1: Create the product detail modal**

Create `src/components/landing/product-detail-modal.tsx`:

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import toast from "react-hot-toast";
import type { Product } from "@/types/product";

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailModal({
  product,
  open,
  onOpenChange,
}: ProductDetailModalProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const { addItem, items } = useCartStore();

  if (!product) return null;

  const handleClose = (v: boolean) => {
    if (!v) {
      setSelectedVariant(null);
      setImgIndex(0);
    }
    onOpenChange(v);
  };

  const handleAddToCart = () => {
    if (selectedVariant === null) return;
    const variant = product.variants[selectedVariant];
    const alreadyInCart = items.find(
      (i) => i.productId === product.id && i.variantLabel === variant.label
    );
    if (alreadyInCart) {
      toast("Produk sudah ada di keranjang", { icon: "🛒" });
      return;
    }
    addItem({
      productId: product.id,
      productName: product.name,
      variantLabel: variant.label,
      price: variant.price,
    });
    toast.success(`${product.name} ditambahkan ke keranjang`);
    handleClose(false);
  };

  const prevImg = () =>
    setImgIndex((i) => (i - 1 + product.thumbnails.length) % product.thumbnails.length);
  const nextImg = () =>
    setImgIndex((i) => (i + 1) % product.thumbnails.length);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-start gap-2">
            <DialogTitle className="flex-1">{product.name}</DialogTitle>
            {product.badge && (
              <Badge variant="warning" className="shrink-0">
                {product.badge}
              </Badge>
            )}
          </div>
        </DialogHeader>

        {/* Thumbnail carousel */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
          <Image
            src={product.thumbnails[imgIndex]}
            alt={`${product.name} - gambar ${imgIndex + 1}`}
            fill
            className="object-cover"
            sizes="512px"
          />
          {product.thumbnails.length > 1 && (
            <>
              <button
                onClick={prevImg}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white transition-colors hover:bg-black/70"
                aria-label="Gambar sebelumnya"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextImg}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white transition-colors hover:bg-black/70"
                aria-label="Gambar berikutnya"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
                {product.thumbnails.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    aria-label={`Gambar ${i + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i === imgIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Description */}
        <DialogDescription className="leading-relaxed">
          {product.description}
        </DialogDescription>

        {/* Variant selector */}
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">
            Pilih Paket:
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v, i) => (
              <button
                key={i}
                onClick={() => setSelectedVariant(i)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-left text-sm transition-all",
                  selectedVariant === i
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-foreground hover:border-primary/50"
                )}
              >
                <span className="block font-medium">{v.label}</span>
                <span className="text-xs opacity-80">
                  Rp {v.price.toLocaleString("id-ID")}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Add to cart */}
        <Button
          className="w-full"
          disabled={selectedVariant === null}
          prefix={<ShoppingCart className="h-4 w-4" />}
          onClick={handleAddToCart}
        >
          Tambah ke Keranjang
        </Button>
      </DialogContent>
    </Dialog>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/product-detail-modal.tsx
git commit -m "feat: add product detail modal with carousel and variant selector"
```

---

## Task 8: Cart Drawer

**Files:**
- Create: `src/components/landing/cart-drawer.tsx`

- [ ] **Step 1: Create the cart drawer**

Create `src/components/landing/cart-drawer.tsx`:

```tsx
"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowLeft, MessageCircle, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import type { CartItem } from "@/store/cart-store";

// Hardcoded admin WhatsApp number (replace with real number)
const ADMIN_WA = "6281234567890";

function formatRupiah(n: number) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

function CartView() {
  const { items, removeItem, goToInvoice } = useCartStore();
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader title="Detail Pesanan" />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {items.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            Keranjang kosong
          </p>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              🧾 Checkout → invoice muncul → lanjut WhatsApp admin untuk
              konfirmasi jika sudah bayar
            </p>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Ringkasan Pesanan
            </p>
            <p className="text-xs text-muted-foreground">
              Total Item: {items.length} produk
            </p>

            {items.map((item, i) => (
              <CartItemRow key={i} item={item} />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3 border-t border-border px-4 py-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium text-foreground">{formatRupiah(total)}</span>
        </div>
        <div className="flex items-center justify-between font-semibold">
          <span className="text-foreground">Total Bayar:</span>
          <span className="text-foreground">{formatRupiah(total)}</span>
        </div>
        <Button
          className="w-full"
          disabled={items.length === 0}
          onClick={goToInvoice}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}

function CartItemRow({ item }: { item: CartItem }) {
  const { removeItem } = useCartStore();

  return (
    <div className="flex items-start justify-between gap-2 rounded-xl border border-border bg-card p-3">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">
          {item.productName}
        </p>
        <p className="text-xs text-muted-foreground">{item.variantLabel}</p>
        <p className="mt-1 text-sm font-semibold text-foreground">
          {formatRupiah(item.price)}
        </p>
      </div>
      <button
        onClick={() => removeItem(item.productId, item.variantLabel)}
        className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        aria-label="Hapus item"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

function InvoiceView() {
  const { items, invoiceNumber, backToCart } = useCartStore();
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const waMessage = encodeURIComponent(
    `Halo admin, saya ingin konfirmasi pembayaran.\n\nInvoice: ${invoiceNumber}\nProduk:\n${items
      .map((i) => `- ${i.productName} (${i.variantLabel}): ${formatRupiah(i.price)}`)
      .join("\n")}\n\nTotal: ${formatRupiah(total)}\n\nSaya sudah transfer dan melampirkan screenshot bukti pembayaran.`
  );

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader title="🧾 Invoice" />

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        <div className="rounded-xl border border-border bg-muted/40 px-4 py-3">
          <p className="text-xs text-muted-foreground">Nomor Invoice</p>
          <p className="font-mono text-sm font-semibold text-foreground">
            {invoiceNumber}
          </p>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="flex items-start justify-between gap-2 text-sm">
              <div>
                <p className="font-medium text-foreground">{item.productName}</p>
                <p className="text-xs text-muted-foreground">{item.variantLabel}</p>
              </div>
              <span className="shrink-0 font-medium text-foreground">
                {formatRupiah(item.price)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-border pt-3 font-semibold">
          <span className="text-foreground">Total Bayar:</span>
          <span className="text-foreground">{formatRupiah(total)}</span>
        </div>
      </div>

      <div className="space-y-2 border-t border-border px-4 py-4">
        <Button
          className="w-full"
          prefix={<MessageCircle className="h-4 w-4" />}
          onClick={() =>
            window.open(`https://wa.me/${ADMIN_WA}?text=${waMessage}`, "_blank")
          }
        >
          Konfirmasi via WhatsApp
        </Button>
        <Button
          variant="ghost"
          className="w-full"
          prefix={<ArrowLeft className="h-4 w-4" />}
          onClick={backToCart}
        >
          Kembali ke Keranjang
        </Button>
      </div>
    </div>
  );
}

function DrawerHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border px-4 py-3">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <DialogPrimitive.Close asChild>
        <button
          className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Tutup"
        >
          <X className="h-4 w-4" />
        </button>
      </DialogPrimitive.Close>
    </div>
  );
}

export function CartDrawer() {
  const { isOpen, invoiceView, closeCart } = useCartStore();

  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) closeCart();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-background shadow-2xl duration-300 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
          aria-describedby={undefined}
        >
          <DialogPrimitive.Title className="sr-only">
            Keranjang Belanja
          </DialogPrimitive.Title>
          {invoiceView ? <InvoiceView /> : <CartView />}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
```

- [ ] **Step 2: Verify cart drawer**

Run `npm run dev`. Open browser, verify no TypeScript errors in console.

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/cart-drawer.tsx
git commit -m "feat: add cart drawer with cart view and invoice view"
```

---

## Task 9: Catalog Section

**Files:**
- Create: `src/components/landing/catalog-section.tsx`

- [ ] **Step 1: Create the catalog section**

Create `src/components/landing/catalog-section.tsx`:

```tsx
"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";
import { ProductDetailModal } from "./product-detail-modal";
import { products } from "@/data/products";
import type { Category, Product } from "@/types/product";

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "semua", label: "Semua Produk" },
  { value: "ai-assistant", label: "AI Assistant" },
  { value: "ai-image", label: "AI Image Generator" },
  { value: "ai-coding", label: "AI Coding" },
  { value: "productivity", label: "Productivity" },
  { value: "design", label: "Design" },
  { value: "writing", label: "Writing" },
];

export function CatalogSection() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("semua");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        const matchCategory =
          activeCategory === "semua" || p.category === activeCategory;
        const matchSearch = p.name
          .toLowerCase()
          .includes(search.toLowerCase());
        return matchCategory && matchSearch;
      }),
    [search, activeCategory]
  );

  const openDetail = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <section id="katalog" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Section header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">Katalog Produk</h2>
          <p className="mt-2 max-w-xl mx-auto text-sm text-muted-foreground">
            Pilih produk, cek paket, masukkan ke keranjang, lalu checkout
            dengan tampilan yang lebih familiar dan nyaman.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 flex justify-center">
          <Input
            id="catalog-search"
            placeholder="Cari produk AI..."
            prefix={<Search className="h-4 w-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            wrapperClassName="w-full max-w-md"
          />
        </div>

        {/* Category filter pills */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                activeCategory === cat.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/50"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            Produk tidak ditemukan.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetail={openDetail}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product detail modal */}
      <ProductDetailModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/catalog-section.tsx
git commit -m "feat: add catalog section with search, filter, and product grid"
```

---

## Task 10: Compose Landing Page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx with the landing page**

Replace the entire contents of `src/app/page.tsx`:

```tsx
import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { InfoSection } from "@/components/landing/info-section";
import { CatalogSection } from "@/components/landing/catalog-section";
import { CartDrawer } from "@/components/landing/cart-drawer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <InfoSection />
        <CatalogSection />
      </main>
      <CartDrawer />
    </div>
  );
}
```

- [ ] **Step 2: Run dev server and do full end-to-end verification**

Run: `npm run dev`

Check the following manually in the browser at `http://localhost:3000`:
1. Navbar is sticky, shows "AI Store" logo, anchor links, cart icon, theme toggle
2. Theme toggle switches between light and dark
3. Hero section shows headline + alur pembelian info box + "Lihat Katalog" button
4. "Lihat Katalog" button smooth-scrolls to catalog section
5. Info section shows tagline + jam operasional card
6. Catalog shows 10 product cards in a grid
7. Search input filters products by name in real time
8. Category filter pills filter products correctly
9. "Lihat Detail" opens product detail modal
10. Thumbnail carousel works (prev/next, dot indicators)
11. Variant selector works, "Tambah ke Keranjang" is disabled until a variant is selected
12. Adding to cart shows toast, closes modal, updates cart badge in navbar
13. Cart icon opens drawer from right
14. Cart drawer shows items, subtotal, total, checkout button
15. "Checkout" switches drawer to invoice view with generated invoice number
16. "Kembali ke Keranjang" switches back to cart view
17. "Konfirmasi via WhatsApp" opens wa.me link in new tab with correct message
18. Closing drawer resets to cart view

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: compose landing page — navbar, hero, info, catalog, cart drawer"
```

---

## Self-Review

### Spec Coverage
- [x] Tagline "Premium AI Tools terpercaya..." → InfoSection
- [x] Jam operasional section → InfoSection
- [x] Hero section with purchase flow → HeroSection
- [x] Catalog with category filter → CatalogSection
- [x] Search field → CatalogSection
- [x] Product detail with thumbnail carousel (max 3), description, price variants (max 6) → ProductDetailModal
- [x] Shopping cart for checkout → CartDrawer CartView
- [x] Invoice view in drawer → CartDrawer InvoiceView
- [x] WhatsApp confirmation → InvoiceView

### Type Consistency
- `CartItem` defined in `cart-store.ts`, exported, used in `cart-drawer.tsx` ✓
- `Product` defined in `types/product.ts`, used in `product-card.tsx`, `product-detail-modal.tsx`, `catalog-section.tsx` ✓
- `Category` used in both `types/product.ts` and `catalog-section.tsx` ✓
- `useCartStore` imported via `@/store/cart-store` in components ✓

### No Placeholders
- All code blocks are complete ✓
- No TBDs ✓
- Admin WA number clearly marked as "replace with real number" ✓
