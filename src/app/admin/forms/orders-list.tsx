"use client";

import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../actions/orders";
import { Loader2, RefreshCw, CheckCircle, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Order = Awaited<ReturnType<typeof getOrders>>[number];

function formatRupiah(n: number) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, status: string) => {
    setIsUpdating(orderId);
    try {
      await updateOrderStatus(orderId, status);
      await fetchOrders();
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(null);
    }
  };

  if (isLoading) {
    return (
      <div className='flex h-64 items-center justify-center border border-border bg-card'>
        <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='font-condensed text-4xl uppercase tracking-tight text-foreground mb-2'>
            Riwayat Pesanan
          </h2>
          <p className='text-sm font-light text-muted-foreground'>
            Daftar transaksi pelanggan dan bukti pembayaran.
          </p>
        </div>
        <button
          onClick={fetchOrders}
          className='flex items-center gap-2 border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-foreground transition-colors hover:bg-foreground hover:text-background'
        >
          <RefreshCw className='h-4 w-4' /> Refresh
        </button>
      </div>

      <div className='border border-border bg-card overflow-hidden'>
        {orders.length === 0 ? (
          <div className='p-10 text-center'>
            <p className='font-condensed text-xl uppercase tracking-widest text-muted-foreground'>
              Belum ada pesanan
            </p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full text-left text-sm'>
              <thead className='border-b border-border bg-muted/20'>
                <tr>
                  <th className='px-4 py-3 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground'>
                    Invoice
                  </th>
                  <th className='px-4 py-3 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground'>
                    Pelanggan
                  </th>
                  <th className='px-4 py-3 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground'>
                    Item
                  </th>
                  <th className='px-4 py-3 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground text-right'>
                    Total
                  </th>
                  <th className='px-4 py-3 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground text-center'>
                    Status
                  </th>
                  <th className='px-4 py-3 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground text-center'>
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-border'>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className='transition-colors hover:bg-muted/5'
                  >
                    <td className='px-4 py-4 align-top'>
                      <p className='font-mono text-xs font-semibold text-foreground'>
                        {order.invoiceNumber}
                      </p>
                      <p className='mt-1 text-[10px] font-light text-muted-foreground'>
                        {new Date(order.createdAt).toLocaleString("id-ID")}
                      </p>
                    </td>
                    <td className='px-4 py-4 align-top'>
                      <p className='font-semibold text-foreground text-xs'>
                        {order.customerName}
                      </p>
                      <a
                        href={`https://wa.me/${order.customerWhatsapp.startsWith("0") ? "62" + order.customerWhatsapp.slice(1) : order.customerWhatsapp}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='mt-1 inline-block text-[10px] font-mono text-(--accent) hover:underline'
                      >
                        {order.customerWhatsapp}
                      </a>
                    </td>
                    <td className='px-4 py-4 align-top max-w-[200px]'>
                      <ul className='space-y-1'>
                        {order.items.map((item) => (
                          <li key={item.id} className='text-[10px]'>
                            <span className='font-semibold text-foreground'>
                              {item.productName}
                            </span>
                            <span className='text-muted-foreground'>
                              {" "}
                              ({item.variantLabel})
                            </span>
                          </li>
                        ))}
                      </ul>
                      {order.paymentMethod && (
                        <p className='mt-2 flex items-center gap-1 text-[9px] uppercase tracking-wider text-muted-foreground'>
                          Metode:{" "}
                          <span className='font-bold text-foreground'>
                            {order.paymentMethod}
                          </span>
                        </p>
                      )}
                    </td>
                    <td className='px-4 py-4 align-top text-right'>
                      <span className='font-condensed text-base font-semibold text-foreground'>
                        {formatRupiah(order.totalAmount)}
                      </span>
                    </td>
                    <td className='px-4 py-4 align-top text-center'>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.15em]",
                          order.status === "PENDING" &&
                            "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
                          order.status === "COMPLETED" &&
                            "bg-green-500/10 text-green-500 border border-green-500/20",
                          order.status === "CANCELLED" &&
                            "bg-destructive/10 text-destructive border border-destructive/20",
                        )}
                      >
                        {order.status === "PENDING" && (
                          <Clock className='h-3 w-3' />
                        )}
                        {order.status === "COMPLETED" && (
                          <CheckCircle className='h-3 w-3' />
                        )}
                        {order.status === "CANCELLED" && (
                          <XCircle className='h-3 w-3' />
                        )}
                        {order.status}
                      </span>
                    </td>
                    <td className='px-4 py-4 align-top text-center'>
                      <div className='flex flex-col gap-1.5 items-center'>
                        {order.status === "PENDING" && (
                          <>
                            <button
                              onClick={() =>
                                handleUpdateStatus(order.id, "COMPLETED")
                              }
                              disabled={isUpdating === order.id}
                              className='w-full border border-green-500/50 bg-green-500/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-green-500 hover:bg-green-500 hover:text-white transition-colors disabled:opacity-50'
                            >
                              {isUpdating === order.id ? "..." : "Selesai"}
                            </button>
                            <button
                              onClick={() =>
                                handleUpdateStatus(order.id, "CANCELLED")
                              }
                              disabled={isUpdating === order.id}
                              className='w-full border border-destructive/50 bg-destructive/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-destructive hover:bg-destructive hover:text-white transition-colors disabled:opacity-50'
                            >
                              {isUpdating === order.id ? "..." : "Batal"}
                            </button>
                          </>
                        )}
                        {order.status !== "PENDING" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(order.id, "PENDING")
                            }
                            disabled={isUpdating === order.id}
                            className='w-full border border-border px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-muted-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-50'
                          >
                            {isUpdating === order.id ? "..." : "Set Pending"}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
