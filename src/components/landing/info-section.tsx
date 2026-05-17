const specs = [
  {
    value: "08.00 – 22.00",
    unit: "WIB",
    label: "Jam Operasional",
    note: "Konfirmasi & cek pembayaran diproses admin pada jam operasional.",
  },
  {
    value: "< 1 JAM",
    unit: "AKTIVASI",
    label: "Proses Cepat",
    note: "Produk diaktivasi dalam waktu kurang dari 1 jam setelah pembayaran dikonfirmasi.",
  },
  {
    value: "10+",
    unit: "PRODUK",
    label: "AI Tools Premium",
    note: "ChatGPT, Claude, Midjourney, GitHub Copilot, Canva Pro, dan masih banyak lagi.",
  },
];

export function InfoSection() {
  return (
    <section id="cara-beli" className="bg-background">
      {/* AI brand stripe divider — used sparingly like M-stripe */}
      <div className="ai-stripe w-full" />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        {/* Section label */}
        <p
          data-aos="fade-up"
          className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
        >
          Mengapa AI Store
        </p>

        {/* Spec cells — BMW M spec-cell treatment */}
        <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
          {specs.map((spec, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="flex flex-col justify-between bg-card p-8"
            >
              {/* Value — display-sm treatment */}
              <div>
                <p className="font-condensed text-[clamp(2rem,4vw,3rem)] leading-none text-foreground">
                  {spec.value}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-(--accent)">
                  {spec.unit}
                </p>
              </div>

              {/* Label + note — label-uppercase + body-sm */}
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
