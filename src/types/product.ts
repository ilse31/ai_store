export type Category =
  | "semua"
  | "ai-assistant"
  | "ai-image"
  | "ai-coding"
  | "productivity"
  | "design"
  | "writing";

export interface PriceVariant {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Exclude<Category, "semua">;
  description: string;
  thumbnails: string[];  // 1–3 image URLs
  variants: PriceVariant[];  // 1–6 price options
  badge?: string;
}
