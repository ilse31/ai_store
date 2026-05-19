-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "siteName" TEXT NOT NULL DEFAULT 'AI Store',
    "footerTagline" TEXT NOT NULL DEFAULT 'Premium AI Tools Terpercaya · Proses Cepat · Support Ramah',
    "adminWhatsapp" TEXT NOT NULL DEFAULT '6289530571642'
);

-- CreateTable
CREATE TABLE "HeroContent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "eyebrow" TEXT NOT NULL DEFAULT 'Premium AI Tools',
    "headline1" TEXT NOT NULL DEFAULT 'Terpercaya.',
    "headline2" TEXT NOT NULL DEFAULT 'Proses Cepat.',
    "headline3" TEXT NOT NULL DEFAULT 'Support Ramah.',
    "subcopy" TEXT NOT NULL DEFAULT 'Belanja produk digital dengan tampilan lebih rapi, harga jelas, dan alur checkout yang mudah seperti marketplace.',
    "alurText" TEXT NOT NULL DEFAULT 'checkout → invoice muncul → screenshot → konfirmasi WhatsApp admin',
    "ctaLabel" TEXT NOT NULL DEFAULT 'Lihat Katalog'
);

-- CreateTable
CREATE TABLE "SpecCell" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "value" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "note" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "badge" TEXT,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "ProductThumbnail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "productId" TEXT NOT NULL,
    CONSTRAINT "ProductThumbnail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "productId" TEXT NOT NULL,
    CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    "qrisImageSrc" TEXT
);

-- CreateTable
CREATE TABLE "PaymentStep" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "text" TEXT NOT NULL,
    "paymentMethodId" TEXT NOT NULL,
    CONSTRAINT "PaymentStep_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
