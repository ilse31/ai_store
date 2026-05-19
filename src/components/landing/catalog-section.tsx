import { prisma } from "@/lib/prisma";
import { CatalogClient } from "./catalog-client";

export async function CatalogSection() {
  const products = await prisma.product.findMany({
    orderBy: { order: "asc" },
    include: {
      thumbnails: { orderBy: { order: "asc" } },
      variants: { orderBy: { order: "asc" } },
    },
  });

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

        <CatalogClient products={products} />
      </div>
    </section>
  );
}
