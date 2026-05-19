import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
  const { password } = (await req.json()) as { password: string };
  const cmsPassword = process.env.CMS_PASSWORD ?? "admin123";

  if (password !== cmsPassword) {
    return NextResponse.json({ error: "Password salah" }, { status: 401 });
  }

  const session = await getSession();
  session.isAdmin = true;
  await session.save();

  return NextResponse.json({ ok: true });
}
