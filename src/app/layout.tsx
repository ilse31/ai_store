import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/toaster";
import { AosInit } from "@/components/aos-init";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Store — Premium AI Tools Terpercaya",
  description:
    "Belanja produk digital AI terbaik. ChatGPT, Claude, Midjourney, dan lainnya. Proses cepat, support ramah.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Anti-FOUC: apply dark class before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var dark=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(dark)document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${barlow.variable} ${barlowCondensed.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AosInit />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
