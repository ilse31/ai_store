import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface OrderItemInput {
  productId: string;
  productName: string;
  variantLabel: string;
  price: number;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const proofFile = formData.get("proofFile") as File | null;
    const orderDataStr = formData.get("orderData") as string | null;

    if (!proofFile || !orderDataStr) {
      return NextResponse.json(
        { error: "Missing file or order data" },
        { status: 400 },
      );
    }

    const orderData = JSON.parse(orderDataStr);
    const {
      invoiceNumber,
      customerName,
      customerWhatsapp,
      customerEmail,
      totalAmount,
      paymentMethod,
      notes,
      items,
    } = orderData;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    let telegramFileId: string | null = null;
    let telegramMessageSent = false;

    // Send to Telegram if credentials exist
    if (botToken && chatId) {
      try {
        const caption = [
          `💰 *PESANAN BARU MASUK* 💰`,
          ``,
          `*Order ID:* ${invoiceNumber}`,
          `*Nama:* ${customerName}`,
          `*WA:* ${customerWhatsapp}`,
          customerEmail ? `*Email:* ${customerEmail}` : "",
          `*Total:* Rp ${totalAmount.toLocaleString("id-ID")}`,
          `*Pembayaran:* ${paymentMethod}`,
          notes ? `*Catatan:* ${notes}` : "",
          ``,
          `*Items:*`,
          ...items.map(
            (i: OrderItemInput) => `- ${i.productName} (${i.variantLabel}) - Rp ${i.price.toLocaleString("id-ID")}`,
          ),
        ]
          .filter(Boolean)
          .join("\n");

        const telegramFormData = new FormData();
        telegramFormData.append("chat_id", chatId);
        telegramFormData.append("photo", proofFile);
        telegramFormData.append("caption", caption);
        telegramFormData.append("parse_mode", "Markdown");

        const response = await fetch(
          `https://api.telegram.org/bot${botToken}/sendPhoto`,
          {
            method: "POST",
            body: telegramFormData as unknown as BodyInit,
          },
        );

        if (response.ok) {
          const result = await response.json();
          if (result.ok && result.result.photo) {
            telegramMessageSent = true;
            // Get the highest resolution photo (last element in the array)
            const photoArray = result.result.photo;
            telegramFileId = photoArray[photoArray.length - 1].file_id;
          }
        } else {
          console.error("Telegram API Error:", await response.text());
        }
      } catch (telegramErr) {
        console.error("Failed to send to Telegram:", telegramErr);
        // We continue saving to DB even if Telegram fails, so we don't lose the order
      }
    }

    // Save to Database
    const order = await prisma.order.create({
      data: {
        invoiceNumber,
        customerName,
        customerWhatsapp,
        customerEmail,
        totalAmount,
        paymentMethod,
        notes,
        telegramFileId,
        status: "PENDING",
        items: {
          create: items.map((i: OrderItemInput) => ({
            productId: i.productId,
            productName: i.productName,
            variantLabel: i.variantLabel,
            price: i.price,
            quantity: 1, // Defaulting to 1 as per current cart flow where items are individual
          })),
        },
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      telegramMessageSent,
    });
  } catch (error) {
    console.error("Checkout submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
