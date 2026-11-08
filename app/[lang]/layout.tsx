import type { Metadata } from "next";
import "../globals.css";
import { getDictionary } from "@/lib/i18n";
import { getLang } from "@/lib/routing";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const dict = getDictionary(await getLang(params));
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
  };
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  return (
    <html lang={lang} className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
