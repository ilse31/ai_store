import Image from "next/image";
import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { InfoSection } from "@/components/landing/info-section";
import { CatalogSection } from "@/components/landing/catalog-section";
import { CartDrawer } from "@/components/landing/cart-drawer";
import { PAYMENT_METHODS } from "@/data/payment-methods";

export default function Home() {
  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main>
        <HeroSection />
        <InfoSection />
        <CatalogSection />
      </main>

      {/* Footer — BMW M footer treatment */}
      <footer className='border-t border-border bg-background px-6 py-8'>
        <div className='mx-auto flex max-w-7xl flex-col gap-5'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <span className='font-condensed text-sm uppercase tracking-[0.12em] text-foreground'>
              AI Store
            </span>
            <p className='text-xs font-light text-muted-foreground'>
              Premium AI Tools Terpercaya · Proses Cepat · Support Ramah
            </p>
            <p className='text-xs font-light text-muted-foreground'>
              © {new Date().getFullYear()} AI Store. All rights reserved.
            </p>
          </div>

          <div
            className='flex flex-wrap items-center justify-center gap-3 text-muted-foreground'
            aria-label='Metode pembayaran'
          >
            {PAYMENT_METHODS.map((paymentMethod) => (
              <Image
                key={paymentMethod.id}
                alt={paymentMethod.label}
                className='h-6 w-auto object-contain'
                height={24}
                src={paymentMethod.logoSrc}
                unoptimized
                width={96}
              />
            ))}
          </div>
        </div>
      </footer>

      <CartDrawer />
    </div>
  );
}
