"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
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
    <section id="katalog" className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div
          data-aos="fade-up"
          className="mb-10 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Katalog
            </p>
            <h2 className="font-condensed text-4xl uppercase text-foreground sm:text-5xl">
              AI Tools Premium
            </h2>
          </div>
          <p className="max-w-xs text-sm font-light text-muted-foreground">
            Pilih produk, cek paket, masukkan ke keranjang, lalu checkout.
          </p>
        </div>

        {/* Search input — BMW M text-input style */}
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

        {/* Category tabs — wrapping grid, no horizontal scroll */}
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
      </div>

      <ProductDetailModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
}
