"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";
import { ProductDetailModal } from "./product-detail-modal";
import type { CmsProduct } from "@/types/cms";
import type { Product } from "@/types/product";

type Category =
  | "semua"
  | "ai-assistant"
  | "ai-image"
  | "ai-coding"
  | "productivity"
  | "design"
  | "writing";

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "semua", label: "Semua Produk" },
  { value: "ai-assistant", label: "AI Assistant" },
  { value: "ai-image", label: "AI Image Generator" },
  { value: "ai-coding", label: "AI Coding" },
  { value: "productivity", label: "Productivity" },
  { value: "design", label: "Design" },
  { value: "writing", label: "Writing" },
];

// Map CmsProduct (Prisma shape) → Product (legacy type used by ProductCard/Modal)
function toProduct(p: CmsProduct): Product {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    category: p.category as Product["category"],
    badge: p.badge ?? undefined,
    description: p.description,
    sold: p.sold,
    rating: p.rating,
    thumbnails: p.thumbnails.map((t) => t.url),
    variants: p.variants.map((v) => ({ label: v.label, price: v.price })),
  };
}

interface CatalogClientProps {
  products: CmsProduct[];
}

export function CatalogClient({ products }: CatalogClientProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("semua");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(
    () =>
      products
        .filter((p) => {
          const matchCategory =
            activeCategory === "semua" || p.category === activeCategory;
          const matchSearch = p.name
            .toLowerCase()
            .includes(search.toLowerCase());
          return matchCategory && matchSearch;
        })
        .map(toProduct),
    [search, activeCategory, products]
  );

  const openDetail = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <>
      {/* Search input */}
      <div className="mb-0 flex">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="CARI PRODUK..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full border border-border bg-transparent pl-9 pr-4 text-xs font-semibold uppercase tracking-widest text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="mb-10 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={cn(
              "border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors",
              activeCategory === cat.value
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-condensed text-3xl uppercase text-muted-foreground">
            Produk Tidak Ditemukan
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetail={openDetail}
            />
          ))}
        </div>
      )}

      <ProductDetailModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
