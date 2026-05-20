"use client";

import { useEffect, useState } from "react";
import type { CmsSpecCell } from "@/types/cms";

export function InfoSection() {
  const [specs, setSpecs] = useState<CmsSpecCell[]>([]);

  useEffect(() => {
    fetch("/api/cms/specs")
      .then((r) => r.json())
      .then(setSpecs);
  }, []);

  return (
    <section id="cara-beli" className="bg-background">
      {/* AI brand stripe divider */}
      <div className="ai-stripe w-full" />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        {/* Section label */}
        <p
          data-aos="fade-up"
          className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
        >
          Mengapa AI Store
        </p>

        {/* Spec cells */}
        <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
          {specs.map((spec, i) => (
            <div
              key={spec.id}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="flex flex-col justify-between bg-card p-8"
            >
              <div>
                <p className="font-condensed text-[clamp(2rem,4vw,3rem)] leading-none text-foreground">
                  {spec.value}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-(--accent)">
                  {spec.unit}
                </p>
              </div>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-foreground">
                  {spec.label}
                </p>
                <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                  {spec.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-border" />
    </section>
  );
}
