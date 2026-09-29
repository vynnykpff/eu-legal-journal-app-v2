import Image from "next/image";
import { getAllArticles } from "@/lib/data";
import { getMainMenu, getReleases, getSiteSettings } from "@/lib/cms";
import { HeaderClient } from "@/components/header-client";
import { makeSearchEntries } from "@/lib/search";
import type { Lang } from "@/lib/types";

export async function Shell({ lang, children }: { lang: Lang; active?: string; children: React.ReactNode }) {
  const [settings, menu, releases] = await Promise.all([getSiteSettings(lang), getMainMenu(lang), getReleases(lang)]);
  const articles = getAllArticles(releases);

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderClient lang={lang} menu={menu} settings={settings} searchEntries={makeSearchEntries(lang, articles, menu)} />
      <main className="flex-1 pb-16 md:pb-20">{children}</main>
      <footer className="mt-auto border-t border-border bg-white py-12 text-sm text-muted">
        <div className="container grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="space-y-5">
            {settings.logoHeader && (
              <Image
                src={settings.logoHeader}
                alt="Європейський університет"
                width={308}
                height={54}
                className="h-auto w-[260px]"
                unoptimized
              />
            )}
            <span className="block text-base text-[#6b7890]">{settings.copyrights}</span>
          </div>
          <div className="rounded-md bg-[#f4f7fb] px-5 py-4 text-base font-medium text-[#5e6f8b]">
            ISSN {settings.issn} (Print) · DOI prefix 10.36919
          </div>
        </div>
      </footer>
    </div>
  );
}
