import { ArrowRight, Receipt } from "lucide-react";
import { prisma } from "@/lib/prisma";

export async function HeroSection() {
  const hero = await prisma.heroContent.findFirst() ?? {
    eyebrow: "Premium AI Tools",
    headline1: "Terpercaya.",
    headline2: "Proses Cepat.",
    headline3: "Support Ramah.",
    subcopy:
      "Belanja produk digital dengan tampilan lebih rapi, harga jelas, dan alur checkout yang mudah seperti marketplace.",
    alurText:
      "checkout → invoice muncul → screenshot → konfirmasi WhatsApp admin",
    ctaLabel: "Lihat Katalog",
  };

  return (
    <section id="hero" className="relative bg-background">
      {/* AI brand stripe — top edge */}
      <div className="ai-stripe w-full" />

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 md:py-40">
        {/* Eyebrow label */}
        <p
          data-aos="fade-up"
          className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-(--accent)"
        >
          {hero.eyebrow}
        </p>

        {/* Hero headline */}
        <h1
          data-aos="fade-up"
          data-aos-delay="100"
          className="font-condensed text-[clamp(3.5rem,9vw,8rem)] uppercase leading-none tracking-tight text-foreground"
        >
          {hero.headline1}
          <br />
          {hero.headline2}
          <br />
          <span className="text-muted-foreground">{hero.headline3}</span>
        </h1>

        {/* Hairline divider */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="my-10 h-px w-full max-w-2xl bg-border"
        />

        {/* Sub-copy */}
        <div data-aos="fade-up" data-aos-delay="300" className="max-w-xl">
          <p className="text-base font-light leading-relaxed text-muted-foreground">
            {hero.subcopy}
          </p>
          <p className="mt-4 flex text-sm font-light text-muted-foreground">
            <span className="mr-1.5 flex font-semibold text-foreground">
              <Receipt className="mr-1 h-4 w-4" /> Alur:
            </span>
            {hero.alurText}
          </p>
        </div>

        {/* CTA */}
        <div data-aos="fade-up" data-aos-delay="400" className="mt-10">
          <a
            href="#katalog"
            className="group inline-flex h-12 items-center gap-3 border border-foreground bg-transparent px-8 text-xs font-bold uppercase tracking-[0.15em] text-foreground transition-all hover:bg-foreground hover:text-background"
          >
            {hero.ctaLabel}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Bottom hairline */}
      <div className="h-px w-full bg-border" />
    </section>
  );
}
