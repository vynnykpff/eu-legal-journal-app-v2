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
      <footer className="mt-auto border-t border-border bg-[#f8fafd] text-sm text-muted">
        <div className="container grid gap-6 py-7 text-center lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:text-left">
          <div className="grid justify-items-center gap-4 lg:justify-items-start">
            <div className="w-[220px] max-w-full sm:w-[250px] md:w-[270px]">
              {settings.logoHeader && (
                <Image
                  src={settings.logoHeader}
                  alt="Європейський університет"
                  width={308}
                  height={54}
                  className="h-auto w-full"
                  unoptimized
                />
              )}
            </div>
            <span className="block w-[220px] max-w-full border-t border-border pt-3 text-sm leading-5 text-[#6b7890] sm:w-[250px] md:w-[270px]">{settings.copyrights}</span>
          </div>
          <div className="mx-auto grid w-full max-w-[360px] gap-2 text-primary sm:flex sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-5 sm:gap-y-2 lg:mx-0 lg:justify-end">
            <div className="flex items-baseline justify-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wide text-muted">ISSN</span>
              <span className="text-base font-bold">{settings.issn}</span>
            </div>
            <div className="hidden h-4 w-px bg-border sm:block" />
            <div className="flex items-baseline justify-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wide text-muted">DOI prefix</span>
              <span className="text-base font-bold">10.36919</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
