"use client";

import { useEffect, useState } from "react";
import { getAnalytics } from "../actions/analytics";
import { Loader2, TrendingUp, ShoppingBag, Trophy } from "lucide-react";

type AnalyticsData = Awaited<ReturnType<typeof getAnalytics>>;

function formatRupiah(n: number) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAnalytics();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center border border-border bg-card">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-border bg-card p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3 text-muted-foreground mb-4">
            <TrendingUp className="h-5 w-5 text-(--accent)" />
            <h3 className="text-xs font-bold uppercase tracking-[0.15em]">Total Pendapatan</h3>
          </div>
          <p className="font-condensed text-4xl text-foreground">
            {formatRupiah(data.totalRevenue)}
          </p>
        </div>
        
        <div className="border border-border bg-card p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3 text-muted-foreground mb-4">
            <ShoppingBag className="h-5 w-5 text-(--accent)" />
            <h3 className="text-xs font-bold uppercase tracking-[0.15em]">Total Transaksi</h3>
          </div>
          <p className="font-condensed text-4xl text-foreground">
            {data.totalOrders} <span className="text-sm font-light text-muted-foreground">pesanan</span>
          </p>
        </div>
      </div>

      {/* Top Products */}
      <div className="border border-border bg-card">
        <div className="border-b border-border p-5 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-foreground">Produk Terlaris</h3>
        </div>
        {data.bestSellingProducts.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-xs font-light text-muted-foreground uppercase tracking-widest">
              Belum ada data penjualan
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {data.bestSellingProducts.map((product, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 transition-colors hover:bg-muted/5">
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center border border-border bg-muted/20 font-bold text-muted-foreground">
                    #{idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{product.name}</p>
                    <p className="text-[10px] font-light text-muted-foreground">{product.variant}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-condensed text-lg text-foreground">{product.count} <span className="text-[10px] font-light uppercase tracking-wider text-muted-foreground">terjual</span></p>
                  <p className="text-[10px] font-semibold text-(--accent)">{formatRupiah(product.revenue)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
