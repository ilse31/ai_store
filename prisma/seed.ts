import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // ── Site Settings ─────────────────────────────────────────────────────────
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      siteName: "AI Store",
      footerTagline:
        "Premium AI Tools Terpercaya · Proses Cepat · Support Ramah",
      adminWhatsapp: "6289530571642",
    },
  });

  // ── Hero Content ──────────────────────────────────────────────────────────
  await prisma.heroContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      eyebrow: "Premium AI Tools",
      headline1: "Terpercaya.",
      headline2: "Proses Cepat.",
      headline3: "Support Ramah.",
      subcopy:
        "Belanja produk digital dengan tampilan lebih rapi, harga jelas, dan alur checkout yang mudah seperti marketplace.",
      alurText:
        "checkout → invoice muncul → screenshot → konfirmasi WhatsApp admin",
      ctaLabel: "Lihat Katalog",
    },
  });

  // ── Spec Cells ────────────────────────────────────────────────────────────
  await prisma.specCell.deleteMany();
  await prisma.specCell.createMany({
    data: [
      {
        order: 0,
        value: "08.00 – 22.00",
        unit: "WIB",
        label: "Jam Operasional",
        note: "Konfirmasi & cek pembayaran diproses admin pada jam operasional.",
      },
      {
        order: 1,
        value: "< 1 JAM",
        unit: "AKTIVASI",
        label: "Proses Cepat",
        note: "Produk diaktivasi dalam waktu kurang dari 1 jam setelah pembayaran dikonfirmasi.",
      },
      {
        order: 2,
        value: "10+",
        unit: "PRODUK",
        label: "AI Tools Premium",
        note: "ChatGPT, Claude, Midjourney, GitHub Copilot, Canva Pro, dan masih banyak lagi.",
      },
    ],
  });

  // ── Products ──────────────────────────────────────────────────────────────
  await prisma.productVariant.deleteMany();
  await prisma.productThumbnail.deleteMany();
  await prisma.product.deleteMany();

  const productsData = [
    {
      id: "chatgpt-plus",
      name: "ChatGPT Plus Privat",
      slug: "chatgpt-plus",
      category: "ai-assistant",
      badge: "Terlaris",
      description:
        "Akses ChatGPT-4o dengan kapasitas penuh. Tidak dibagi dengan pengguna lain. Cocok untuk produktivitas harian, coding, analisis dokumen, dan kreativitas. Proses aktivasi cepat, support 24 jam.",
      order: 0,
      thumbnails: [
        "https://picsum.photos/seed/chatgpt1/800/450",
        "https://picsum.photos/seed/chatgpt2/800/450",
      ],
      variants: [
        { label: "1 Bulan", price: 299000 },
        { label: "3 Bulan", price: 849000 },
      ],
    },
    {
      id: "claude-pro",
      name: "Claude Pro Privat",
      slug: "claude-pro",
      category: "ai-assistant",
      description:
        "Claude 3.5 Sonnet & Claude 3 Opus dengan kuota diprioritaskan. Ideal untuk penulisan panjang, analisis mendalam, dan coding. Akun privat, tidak shared.",
      order: 1,
      thumbnails: [
        "https://picsum.photos/seed/claude1/800/450",
        "https://picsum.photos/seed/claude2/800/450",
        "https://picsum.photos/seed/claude3/800/450",
      ],
      variants: [
        { label: "1 Bulan", price: 249000 },
        { label: "3 Bulan", price: 699000 },
      ],
    },
    {
      id: "perplexity-pro",
      name: "Perplexity Pro",
      slug: "perplexity-pro",
      category: "ai-assistant",
      description:
        "Search AI terbaik dengan akses ke GPT-4 dan Claude. Cocok untuk riset, fact-checking, dan jawaban real-time dari internet. Unlimited Pro Search.",
      order: 2,
      thumbnails: ["https://picsum.photos/seed/perplexity1/800/450"],
      variants: [
        { label: "1 Bulan", price: 199000 },
        { label: "1 Tahun", price: 1999000 },
      ],
    },
    {
      id: "midjourney",
      name: "Midjourney",
      slug: "midjourney",
      category: "ai-image",
      badge: "Populer",
      description:
        "Buat gambar AI berkualitas tinggi dengan Midjourney. Tersedia dalam tiga paket sesuai kebutuhan. Cocok untuk desainer, konten kreator, dan seniman digital.",
      order: 3,
      thumbnails: [
        "https://picsum.photos/seed/midjourney1/800/450",
        "https://picsum.photos/seed/midjourney2/800/450",
      ],
      variants: [
        { label: "Basic (200 img/bln)", price: 149000 },
        { label: "Standard (unlmt relax)", price: 299000 },
        { label: "Pro (unlmt fast)", price: 599000 },
      ],
    },
    {
      id: "adobe-firefly",
      name: "Adobe Firefly Premium",
      slug: "adobe-firefly",
      category: "ai-image",
      description:
        "Generate gambar AI berkualitas komersial dengan Adobe Firefly. Terintegrasi dengan ekosistem Adobe. Aman digunakan untuk konten komersial.",
      order: 4,
      thumbnails: [
        "https://picsum.photos/seed/firefly1/800/450",
        "https://picsum.photos/seed/firefly2/800/450",
      ],
      variants: [
        { label: "1 Bulan", price: 199000 },
        { label: "3 Bulan", price: 549000 },
      ],
    },
    {
      id: "blackbox-ai",
      name: "BlackBox AI Pro",
      slug: "blackbox-ai",
      category: "ai-coding",
      description:
        "AI coding assistant dengan autocomplete cerdas, code search, dan chat. Mendukung 20+ bahasa pemrograman. Tingkatkan produktivitas coding hingga 3x lebih cepat.",
      order: 5,
      thumbnails: ["https://picsum.photos/seed/blackbox1/800/450"],
      variants: [
        { label: "1 Bulan", price: 89000 },
        { label: "2 Bulan", price: 169000 },
        { label: "3 Bulan", price: 249000 },
      ],
    },
    {
      id: "github-copilot",
      name: "GitHub Copilot",
      slug: "github-copilot",
      category: "ai-coding",
      description:
        "AI pair programmer dari GitHub. Autocomplete kode, generate fungsi dari komentar, dan chat AI langsung di VS Code. Mendukung semua bahasa populer.",
      order: 6,
      thumbnails: [
        "https://picsum.photos/seed/copilot1/800/450",
        "https://picsum.photos/seed/copilot2/800/450",
      ],
      variants: [
        { label: "1 Bulan", price: 129000 },
        { label: "1 Tahun", price: 1499000 },
      ],
    },
    {
      id: "notion-ai",
      name: "Notion AI",
      slug: "notion-ai",
      category: "productivity",
      badge: "Baru",
      description:
        "Notion lengkap dengan AI terintegrasi. Draft tulisan, rangkum catatan, terjemahkan, dan analisis data langsung di workspace Notion kamu. Plus semua fitur Notion Pro.",
      order: 7,
      thumbnails: [
        "https://picsum.photos/seed/notion1/800/450",
        "https://picsum.photos/seed/notion2/800/450",
      ],
      variants: [
        { label: "1 Bulan", price: 119000 },
        { label: "3 Bulan", price: 339000 },
        { label: "1 Tahun", price: 1199000 },
      ],
    },
    {
      id: "canva-pro",
      name: "Canva Pro",
      slug: "canva-pro",
      category: "design",
      description:
        "Desain profesional dengan template premium, Magic AI, background remover, Brand Kit, dan 100+ juta aset. Akun privat tidak shared.",
      order: 8,
      thumbnails: [
        "https://picsum.photos/seed/canva1/800/450",
        "https://picsum.photos/seed/canva2/800/450",
        "https://picsum.photos/seed/canva3/800/450",
      ],
      variants: [
        { label: "1 Bulan", price: 99000 },
        { label: "3 Bulan", price: 279000 },
        { label: "1 Tahun", price: 899000 },
      ],
    },
    {
      id: "grammarly-premium",
      name: "Grammarly Premium",
      slug: "grammarly-premium",
      category: "writing",
      description:
        "Koreksi grammar, gaya penulisan, plagiarism checker, dan saran penulisan AI. Cocok untuk pelajar, profesional, dan konten kreator berbahasa Inggris.",
      order: 9,
      thumbnails: [
        "https://picsum.photos/seed/grammarly1/800/450",
        "https://picsum.photos/seed/grammarly2/800/450",
      ],
      variants: [
        { label: "1 Bulan", price: 179000 },
        { label: "3 Bulan", price: 499000 },
        { label: "1 Tahun", price: 1699000 },
      ],
    },
  ];

  for (const p of productsData) {
    const { thumbnails, variants, ...productFields } = p;
    await prisma.product.create({
      data: {
        ...productFields,
        thumbnails: {
          create: thumbnails.map((url, i) => ({ url, order: i })),
        },
        variants: {
          create: variants.map((v, i) => ({ ...v, order: i })),
        },
      },
    });
  }

  // ── Payment Methods ───────────────────────────────────────────────────────
  await prisma.paymentStep.deleteMany();
  await prisma.paymentMethod.deleteMany();

  const paymentData = [
    {
      id: "bca",
      label: "BCA",
      type: "bank-transfer",
      typeLabel: "Transfer",
      logoSrc:
        "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg",
      order: 0,
      bankFullName: "Bank Central Asia (BCA)",
      accountNumber: "0980240754",
      accountHolder: "Heri Yulianto",
      accountType: "Tahapan",
      steps: [
        "Login ke BCA Mobile atau datang ke ATM",
        "Pilih menu Transfer",
        "Masukkan nomor rekening: 0980240754",
        "Masukkan nominal sesuai total pembayaran",
        "Pastikan nama penerima: Heri Yulianto",
        "Konfirmasi dan simpan bukti transfer",
        "Upload bukti transfer di form ini",
      ],
    },
    {
      id: "mandiri",
      label: "Mandiri",
      type: "bank-transfer",
      typeLabel: "Transfer",
      logoSrc:
        "https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg",
      order: 1,
      bankFullName: "Bank Mandiri",
      accountNumber: "1090020123456",
      accountHolder: "Heri Yulianto",
      accountType: "Tabungan",
      steps: [
        "Login ke Mandiri Online atau datang ke ATM",
        "Pilih menu Transfer ke Rekening Mandiri",
        "Masukkan nomor rekening: 1090020123456",
        "Masukkan nominal sesuai total pembayaran",
        "Pastikan nama penerima: Heri Yulianto",
        "Konfirmasi dan simpan bukti transfer",
        "Upload bukti transfer di form ini",
      ],
    },
    {
      id: "seabank",
      label: "SeaBank",
      type: "bank-transfer",
      typeLabel: "Transfer",
      logoSrc:
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/SeaBank.svg",
      order: 2,
      bankFullName: "SeaBank Indonesia",
      accountNumber: "901234567890",
      accountHolder: "Heri Yulianto",
      accountType: "Tabungan",
      steps: [
        "Buka aplikasi SeaBank atau m-banking lain",
        "Pilih Transfer ke Bank Lain → SeaBank",
        "Masukkan nomor rekening: 901234567890",
        "Masukkan nominal sesuai total pembayaran",
        "Pastikan nama penerima: Heri Yulianto",
        "Konfirmasi dan simpan bukti transfer",
        "Upload bukti transfer di form ini",
      ],
    },
    {
      id: "ovo",
      label: "OVO",
      type: "e-wallet",
      typeLabel: "E-Wallet",
      logoSrc:
        "https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg",
      order: 3,
      phoneNumber: "081234567890",
      accountName: "Heri Yulianto",
      steps: [
        "Buka aplikasi OVO",
        "Pilih Transfer",
        "Masukkan nomor: 081234567890",
        "Masukkan nominal sesuai total pembayaran",
        "Pastikan nama: Heri Yulianto",
        "Konfirmasi dan simpan bukti",
        "Upload bukti di form ini",
      ],
    },
    {
      id: "dana",
      label: "DANA",
      type: "e-wallet",
      typeLabel: "E-Wallet",
      logoSrc:
        "https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg",
      order: 4,
      phoneNumber: "081234567890",
      accountName: "Heri Yulianto",
      steps: [
        "Buka aplikasi DANA",
        "Pilih Kirim Uang",
        "Masukkan nomor: 081234567890",
        "Masukkan nominal sesuai total pembayaran",
        "Pastikan nama: Heri Yulianto",
        "Konfirmasi dan simpan bukti",
        "Upload bukti di form ini",
      ],
    },
    {
      id: "gopay",
      label: "GoPay",
      type: "e-wallet",
      typeLabel: "E-Wallet",
      logoSrc:
        "https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg",
      order: 5,
      phoneNumber: "081234567890",
      accountName: "Heri Yulianto",
      steps: [
        "Buka Gojek → GoPay",
        "Pilih Kirim",
        "Masukkan nomor: 081234567890",
        "Masukkan nominal sesuai total pembayaran",
        "Pastikan nama: Heri Yulianto",
        "Konfirmasi dan simpan bukti",
        "Upload bukti di form ini",
      ],
    },
    {
      id: "shopeepay",
      label: "ShopeePay",
      type: "e-wallet",
      typeLabel: "E-Wallet",
      logoSrc:
        "https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg",
      order: 6,
      phoneNumber: "081234567890",
      accountName: "Heri Yulianto",
      steps: [
        "Buka Shopee → ShopeePay",
        "Pilih Transfer",
        "Masukkan nomor: 081234567890",
        "Masukkan nominal sesuai total pembayaran",
        "Pastikan nama: Heri Yulianto",
        "Konfirmasi dan simpan bukti",
        "Upload bukti di form ini",
      ],
    },
    {
      id: "qris",
      label: "QRIS",
      type: "qris",
      typeLabel: "Scan QR",
      logoSrc:
        "https://upload.wikimedia.org/wikipedia/commons/e/e0/QRIS_Logo.svg",
      order: 7,
      qrisImageSrc: null,
      steps: [],
    },
  ];

  for (const pm of paymentData) {
    const { steps, ...pmFields } = pm;
    await prisma.paymentMethod.create({
      data: {
        ...pmFields,
        steps: {
          create: steps.map((text, i) => ({ text, order: i })),
        },
      },
    });
  }

  console.log("✅ Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
