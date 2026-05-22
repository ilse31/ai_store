import Image from "next/image";
import { Star } from "lucide-react";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
}

export function ProductCard({ product, onViewDetail }: ProductCardProps) {
  const minPrice = Math.min(...product.variants.map((v) => v.price));

  return (
    <div
      data-aos="fade-up"
      className="group flex cursor-pointer flex-col border border-border bg-card transition-colors hover:border-primary"
      onClick={() => onViewDetail(product)}
    >
      {/* Thumbnail — full-bleed, no rounding */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={product.thumbnails[0]}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 33vw"
        />
        {product.badge && (
          <div className="absolute left-0 top-0">
            <span className="bg-(--accent) px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category label — label-uppercase */}
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
          {product.category.replace("-", " ")}
        </p>

        {/* Product name — title-lg */}
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground">
          {product.name}
        </h3>

        {/* Rating and Sold */}
        <div className="mt-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {product.rating}
          </span>
          <span>•</span>
          <span>{product.sold} Terjual</span>
        </div>

        {/* Price */}
        <div className="mt-auto pt-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Mulai dari
          </p>
          <p className="font-condensed text-2xl text-foreground">
            Rp {minPrice.toLocaleString("id-ID")}
          </p>
        </div>

        {/* CTA — text-link style (BMW M) */}
        <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-foreground transition-colors group-hover:text-(--accent)">
            Lihat Detail
          </span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </div>
  );
}
