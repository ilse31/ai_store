import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "chatgpt-plus",
    name: "ChatGPT Plus Privat",
    slug: "chatgpt-plus",
    category: "ai-assistant",
    badge: "Terlaris",
    sold: 0,
    rating: 5.0,
    description:
      "Akses ChatGPT-4o dengan kapasitas penuh. Tidak dibagi dengan pengguna lain. Cocok untuk produktivitas harian, coding, analisis dokumen, dan kreativitas. Proses aktivasi cepat, support 24 jam.",
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
    sold: 0,
    rating: 5.0,
    description:
      "Claude 3.5 Sonnet & Claude 3 Opus dengan kuota diprioritaskan. Ideal untuk penulisan panjang, analisis mendalam, dan coding. Akun privat, tidak shared.",
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
    sold: 0,
    rating: 5.0,
    description:
      "Search AI terbaik dengan akses ke GPT-4 dan Claude. Cocok untuk riset, fact-checking, dan jawaban real-time dari internet. Unlimited Pro Search.",
    thumbnails: [
      "https://picsum.photos/seed/perplexity1/800/450",
    ],
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
    sold: 0,
    rating: 5.0,
    description:
      "Buat gambar AI berkualitas tinggi dengan Midjourney. Tersedia dalam tiga paket sesuai kebutuhan. Cocok untuk desainer, konten kreator, dan seniman digital.",
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
    sold: 0,
    rating: 5.0,
    description:
      "Generate gambar AI berkualitas komersial dengan Adobe Firefly. Terintegrasi dengan ekosistem Adobe. Aman digunakan untuk konten komersial.",
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
    sold: 0,
    rating: 5.0,
    description:
      "AI coding assistant dengan autocomplete cerdas, code search, dan chat. Mendukung 20+ bahasa pemrograman. Tingkatkan produktivitas coding hingga 3x lebih cepat.",
    thumbnails: [
      "https://picsum.photos/seed/blackbox1/800/450",
    ],
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
    sold: 0,
    rating: 5.0,
    description:
      "AI pair programmer dari GitHub. Autocomplete kode, generate fungsi dari komentar, dan chat AI langsung di VS Code. Mendukung semua bahasa populer.",
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
    sold: 0,
    rating: 5.0,
    description:
      "Notion lengkap dengan AI terintegrasi. Draft tulisan, rangkum catatan, terjemahkan, dan analisis data langsung di workspace Notion kamu. Plus semua fitur Notion Pro.",
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
    sold: 0,
    rating: 5.0,
    description:
      "Desain profesional dengan template premium, Magic AI, background remover, Brand Kit, dan 100+ juta aset. Akun privat tidak shared.",
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
    sold: 0,
    rating: 5.0,
    description:
      "Koreksi grammar, gaya penulisan, plagiarism checker, dan saran penulisan AI. Cocok untuk pelajar, profesional, dan konten kreator berbahasa Inggris.",
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
