import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface CartItem {
  productId: string;
  productName: string;
  variantLabel: string;
  price: number;
}

export interface BuyerInfo {
  name: string;
  whatsapp: string;
  email: string;
  paymentMethodId: string;
  paymentMethodLabel: string;
  notes: string;
  proofFileName: string;
}

export type DrawerView = "cart" | "checkout" | "invoice";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  view: DrawerView;
  invoiceNumber: string | null;
  invoiceTime: string | null;
  buyerInfo: BuyerInfo | null;
}

interface CartActions {
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantLabel: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openCartToCheckout: () => void;
  goToCheckout: () => void;
  goToInvoice: (buyerInfo: BuyerInfo) => void;
  backToCart: () => void;
}

export const useCartStore = create<CartState & CartActions>()(
  immer((set) => ({
    items: [],
    isOpen: false,
    view: "cart",
    invoiceNumber: null,
    invoiceTime: null,
    buyerInfo: null,

    addItem: (item) =>
      set((state) => {
        const exists = state.items.find(
          (i) => i.productId === item.productId && i.variantLabel === item.variantLabel
        );
        if (!exists) state.items.push(item);
      }),

    removeItem: (productId, variantLabel) =>
      set((state) => {
        state.items = state.items.filter(
          (i) => !(i.productId === productId && i.variantLabel === variantLabel)
        );
      }),

    clearCart: () =>
      set((state) => {
        state.items = [];
      }),

    openCart: () =>
      set((state) => {
        state.isOpen = true;
        state.view = "cart";
      }),

    closeCart: () =>
      set((state) => {
        state.isOpen = false;
        state.view = "cart";
        state.invoiceNumber = null;
        state.invoiceTime = null;
        state.buyerInfo = null;
      }),

    openCartToCheckout: () =>
      set((state) => {
        state.isOpen = true;
        state.view = "checkout";
      }),

    goToCheckout: () =>
      set((state) => {
        state.view = "checkout";
      }),

    goToInvoice: (buyerInfo) =>
      set((state) => {
        const now = new Date();
        const ts = now.getTime();
        const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
        state.invoiceNumber = `ORDER_${ts}_${rand}`;
        state.invoiceTime = now.toLocaleString("id-ID");
        state.buyerInfo = buyerInfo;
        state.view = "invoice";
      }),

    backToCart: () =>
      set((state) => {
        state.view = "cart";
        state.invoiceNumber = null;
        state.invoiceTime = null;
        state.buyerInfo = null;
      }),
  }))
);
