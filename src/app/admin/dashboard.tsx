"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, Settings, List, CreditCard, Type, Image as ImageIcon, ShoppingCart } from "lucide-react";
import { SettingsForm } from "./forms/settings-form";
import { HeroForm } from "./forms/hero-form";
import { SpecsForm } from "./forms/specs-form";
import { ProductsList } from "./forms/products-list";
import { PaymentsList } from "./forms/payments-list";
import { OrdersList } from "./forms/orders-list";
import { AnalyticsDashboard } from "./forms/analytics-dashboard";

type Tab = "dashboard" | "orders" | "hero" | "specs" | "products" | "payments" | "settings";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "orders", label: "Pesanan", icon: ShoppingCart },
  { id: "hero", label: "Hero Content", icon: Type },
  { id: "specs", label: "Fitur / Specs", icon: List },
  { id: "products", label: "Produk", icon: ImageIcon },
  { id: "payments", label: "Metode Bayar", icon: CreditCard },
  { id: "settings", label: "Pengaturan", icon: Settings },
] as const;

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        <div className="border-b border-border p-6">
          <h1 className="font-condensed text-2xl uppercase tracking-widest text-foreground">
            CMS Admin
          </h1>
          <p className="mt-1 text-[10px] font-light text-muted-foreground uppercase tracking-[0.1em]">
            AI Store Management
          </p>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-border hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-border p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 border border-border py-3 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-background">
        <div className="p-10 max-w-5xl">
          {activeTab === "dashboard" && (
            <div>
              <h2 className="font-condensed text-4xl uppercase tracking-tight text-foreground mb-4">
                Selamat Datang, Admin.
              </h2>
              <p className="text-sm font-light text-muted-foreground mb-8">
                Pilih menu di samping untuk mengubah konten website. Berikut adalah ringkasan performa toko Anda.
              </p>
              
              <AnalyticsDashboard />
            </div>
          )}
          {activeTab === "orders" && <OrdersList />}
          {activeTab === "hero" && <HeroForm />}
          {activeTab === "specs" && <SpecsForm />}
          {activeTab === "products" && <ProductsList />}
          {activeTab === "payments" && <PaymentsList />}
          {activeTab === "settings" && <SettingsForm />}
        </div>
      </main>
    </div>
  );
}
