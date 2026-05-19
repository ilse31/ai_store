"use server";

import { prisma } from "@/lib/prisma";

export async function getAnalytics() {
  const [totalOrders, totalRevenueData, orderItems] = await Promise.all([
    // Total pesanan
    prisma.order.count(),

    // Total pendapatan (sum of totalAmount)
    prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        status: {
          not: "CANCELLED",
        },
      },
    }),

    // Dapatkan semua order items untuk menghitung produk terlaris
    prisma.orderItem.findMany({
      include: {
        order: true,
      },
    }),
  ]);

  const totalRevenue = totalRevenueData._sum.totalAmount || 0;

  // Hitung frekuensi produk terlaris
  // Kita group by productName dan variantLabel
  const productSales: Record<
    string,
    { name: string; variant: string; count: number; revenue: number }
  > = {};

  orderItems.forEach((item) => {
    // Abaikan pesanan yang dibatalkan
    if (item.order.status === "CANCELLED") return;

    const key = `${item.productName}-${item.variantLabel}`;
    if (!productSales[key]) {
      productSales[key] = {
        name: item.productName,
        variant: item.variantLabel,
        count: 0,
        revenue: 0,
      };
    }

    productSales[key].count += item.quantity;
    productSales[key].revenue += item.price * item.quantity;
  });

  // Urutkan dari yang terbanyak
  const bestSellingProducts = Object.values(productSales).sort(
    (a, b) => b.count - a.count,
  );

  return {
    totalOrders,
    totalRevenue,
    bestSellingProducts: bestSellingProducts.slice(0, 5), // Top 5
  };
}
