-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "siteName" TEXT NOT NULL DEFAULT 'AI Store',
    "footerTagline" TEXT NOT NULL DEFAULT 'Premium AI Tools Terpercaya · Proses Cepat · Support Ramah',
    "adminWhatsapp" TEXT NOT NULL DEFAULT '6289530571642',

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroContent" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "eyebrow" TEXT NOT NULL DEFAULT 'Premium AI Tools',
    "headline1" TEXT NOT NULL DEFAULT 'Terpercaya.',
    "headline2" TEXT NOT NULL DEFAULT 'Proses Cepat.',
    "headline3" TEXT NOT NULL DEFAULT 'Support Ramah.',
    "subcopy" TEXT NOT NULL DEFAULT 'Belanja produk digital dengan tampilan lebih rapi, harga jelas, dan alur checkout yang mudah seperti marketplace.',
    "alurText" TEXT NOT NULL DEFAULT 'checkout → invoice muncul → screenshot → konfirmasi WhatsApp admin',
    "ctaLabel" TEXT NOT NULL DEFAULT 'Lihat Katalog',

    CONSTRAINT "HeroContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecCell" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "value" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "SpecCell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "badge" TEXT,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductThumbnail" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductThumbnail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "typeLabel" TEXT NOT NULL,
    "logoSrc" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "accountHolder" TEXT,
    "accountNumber" TEXT,
    "accountType" TEXT,
    "bankFullName" TEXT,
    "phoneNumber" TEXT,
    "accountName" TEXT,
    "qrisImageSrc" TEXT,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentStep" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "text" TEXT NOT NULL,
    "paymentMethodId" TEXT NOT NULL,

    CONSTRAINT "PaymentStep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- AddForeignKey
ALTER TABLE "ProductThumbnail" ADD CONSTRAINT "ProductThumbnail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentStep" ADD CONSTRAINT "PaymentStep_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE CASCADE ON UPDATE CASCADE;
