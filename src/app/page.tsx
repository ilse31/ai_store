import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { InfoSection } from "@/components/landing/info-section";
import { CatalogSection } from "@/components/landing/catalog-section";
import { CartDrawer } from "@/components/landing/cart-drawer";
import { FooterSection } from "@/components/landing/footer-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <InfoSection />
        <CatalogSection />
      </main>
      <FooterSection />
      <CartDrawer />
    </div>
  );
}
