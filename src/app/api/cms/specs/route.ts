import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export async function GET() {
  const specs = await prisma.specCell.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(specs);
}

export async function PUT(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json()) as Array<{
    id: number;
    order: number;
    value: string;
    unit: string;
    label: string;
    note: string;
  }>;

  const updated = await Promise.all(
    body.map((spec) =>
      prisma.specCell.update({
        where: { id: spec.id },
        data: { value: spec.value, unit: spec.unit, label: spec.label, note: spec.note, order: spec.order },
      })
    )
  );

  return NextResponse.json(updated);
}
