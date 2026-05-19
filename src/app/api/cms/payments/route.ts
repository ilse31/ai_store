import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export async function GET() {
  const methods = await prisma.paymentMethod.findMany({
    orderBy: { order: "asc" },
    include: { steps: { orderBy: { order: "asc" } } },
  });
  return NextResponse.json(methods);
}
