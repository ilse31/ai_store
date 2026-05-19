import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      thumbnails: { orderBy: { order: "asc" } },
      variants: { orderBy: { order: "asc" } },
    },
  });
  if (!product)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { thumbnails = [], variants = [], ...fields } = body;

  // Replace thumbnails and variants entirely
  await prisma.productThumbnail.deleteMany({ where: { productId: id } });
  await prisma.productVariant.deleteMany({ where: { productId: id } });

  const product = await prisma.product.update({
    where: { id },
    data: {
      ...fields,
      thumbnails: {
        create: (thumbnails as string[]).map((url: string, i: number) => ({
          url,
          order: i,
        })),
      },
      variants: {
        create: variants.map(
          (v: { label: string; price: number }, i: number) => ({
            ...v,
            order: i,
          })
        ),
      },
    },
    include: {
      thumbnails: { orderBy: { order: "asc" } },
      variants: { orderBy: { order: "asc" } },
    },
  });

  return NextResponse.json(product);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
