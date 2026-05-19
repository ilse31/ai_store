import Image from "next/image";
import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { InfoSection } from "@/components/landing/info-section";
import { CatalogSection } from "@/components/landing/catalog-section";
import { CartDrawer } from "@/components/landing/cart-drawer";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const [settings, paymentMethods] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.paymentMethod.findMany({ orderBy: { order: "asc" } }),
  ]);

  const footerTagline =
    settings?.footerTagline ??
    "Premium AI Tools Terpercaya · Proses Cepat · Support Ramah";
  const siteName = settings?.siteName ?? "AI Store";

  return (
    <div className="min-h-screen bg-background">
      <Navbar siteName={siteName} />
      <main>
        <HeroSection />
        <InfoSection />
        <CatalogSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-condensed text-sm uppercase tracking-[0.12em] text-foreground">
              {siteName}
            </span>
            <p className="text-xs font-light text-muted-foreground">
              {footerTagline}
            </p>
            <p className="text-xs font-light text-muted-foreground">
              © {new Date().getFullYear()} {siteName}. All rights reserved.
            </p>
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-3 text-muted-foreground"
            aria-label="Metode pembayaran"
          >
            {paymentMethods.map((pm) => (
              <Image
                key={pm.id}
                alt={pm.label}
                className="h-6 w-auto object-contain"
                height={24}
                src={pm.logoSrc}
                unoptimized
                width={96}
              />
            ))}
          </div>
        </div>
      </footer>

      <CartDrawer adminWhatsapp={settings?.adminWhatsapp ?? "6289530571642"} />
    </div>
  );
}
