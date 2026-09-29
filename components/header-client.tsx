"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import type { Lang, MenuItem, SiteSettings } from "@/lib/types";
import type { SearchEntry } from "@/lib/search";
import { Icon } from "@/components/icons";
import { cn } from "@/components/ui";

export function HeaderClient({
  lang,
  menu,
  settings,
  searchEntries,
}: {
  lang: Lang;
  menu: MenuItem[];
  settings: SiteSettings;
  searchEntries: SearchEntry[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (normalized.length < 2) return [];
    return searchEntries
      .filter((entry) => `${entry.title} ${entry.meta}`.toLowerCase().includes(normalized))
      .slice(0, 7);
  }, [query, searchEntries]);

  const switchLanguage = (nextLang: Lang) => {
    const parts = pathname.split("/");
    parts[1] = nextLang;
    router.push(parts.join("/") || `/${nextLang}/`);
  };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (results[0]) {
      router.push(results[0].href);
      setQuery("");
    }
  };

  return (
    <header className="bg-white">
      <div className="container flex min-h-[70px] items-center justify-between gap-6 py-3">
        <Link href={`/${lang}/`} className="block shrink-0" aria-label="Європейський університет">
          {settings.logoHeader ? (
            <Image src={settings.logoHeader} alt="Європейський університет" width={308} height={54} className="h-auto w-[250px] max-w-[62vw]" unoptimized />
          ) : (
            <div>
              <div className="text-xl font-bold leading-none text-primary">ЄВРОПЕЙСЬКИЙ</div>
              <div className="text-sm font-semibold tracking-[0.42em] text-primary">УНІВЕРСИТЕТ</div>
            </div>
          )}
        </Link>

        <div className="hidden items-center gap-5 text-sm text-[#31405a] lg:flex">
          <a className="inline-flex items-center gap-2 whitespace-nowrap" href={`mailto:${settings.email}`}>
            <Icon name="mail" className="h-4 w-4" />{settings.email}
          </a>
          <div className="flex items-center gap-2">
            <Icon name="globe" className="h-4 w-4" />
            <LanguageSwitch lang={lang} onChange={switchLanguage} />
          </div>
          <form className="relative" onSubmit={submitSearch}>
            <label className="flex h-9 w-56 items-center gap-2 rounded-md border border-border bg-white px-3 text-muted">
              <input
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none"
                placeholder="Пошук по сайту"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Icon name="search" className="h-4 w-4" />
            </label>
            {!!results.length && (
              <div className="absolute right-0 top-11 z-30 w-[360px] rounded-md border border-border bg-white p-2 shadow-xl">
                {results.map((result) => (
                  <Link
                    key={result.href}
                    href={result.href}
                    className="block rounded px-3 py-2 hover:bg-accent-soft"
                    onClick={() => setQuery("")}
                  >
                    <span className="block text-sm font-semibold text-primary">{result.title}</span>
                    <span className="block truncate text-xs text-muted">{result.meta}</span>
                  </Link>
                ))}
              </div>
            )}
          </form>
        </div>

        <button className="grid h-11 w-11 place-items-center rounded-md border border-border bg-white text-primary shadow-sm lg:hidden" type="button" onClick={() => setIsMenuOpen((value) => !value)} aria-label="Меню">
          <span className="text-2xl leading-none">{isMenuOpen ? "×" : "☰"}</span>
        </button>
      </div>

      <nav className="bg-primary text-white">
        <div className="container hidden items-center gap-1 lg:flex">
          <div className="whitespace-nowrap bg-[#041e4c] px-5 py-3 text-sm font-semibold">ISSN {settings.issn}</div>
          {menu.map((item) => (
            <div className="group relative" key={`${item.id}-${item.label}`}>
              <Link
                href={item.items.length ? "#" : item.link}
                className={`relative block whitespace-nowrap px-4 py-3 text-sm font-medium ${isActive(pathname, item) ? "text-white" : "text-[#dbe5f6]"}`}
              >
                {item.label}
                {item.items.length > 0 && <span className="ml-2">▾</span>}
                {isActive(pathname, item) && <span className="absolute inset-x-3 bottom-0 h-1 bg-accent" />}
              </Link>
              {item.items.length > 0 && (
                <div className="invisible absolute left-0 top-full z-20 min-w-[320px] translate-y-2 rounded-md border border-border bg-white p-2 text-primary opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.items.map((child) => (
                    <Link key={`${child.id}-${child.label}`} href={child.link} className="block rounded px-3 py-2 text-sm leading-5 hover:bg-accent-soft">
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </nav>
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-primary/30 backdrop-blur-sm lg:hidden" onClick={() => setIsMenuOpen(false)}>
          <div className="ml-auto flex h-full w-[min(420px,92vw)] flex-col overflow-y-auto bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-border p-5">
              <span className="text-lg font-bold text-primary">Меню</span>
              <button className="grid h-10 w-10 place-items-center rounded-md border border-border text-2xl text-primary" type="button" onClick={() => setIsMenuOpen(false)} aria-label="Закрити меню">×</button>
            </div>
            <div className="space-y-4 p-5">
              <form className="relative" onSubmit={submitSearch}>
                <label className="flex h-11 items-center gap-2 rounded-md border border-border bg-white px-3 text-muted">
                  <input className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none" placeholder="Пошук по сайту" value={query} onChange={(event) => setQuery(event.target.value)} />
                  <Icon name="search" className="h-4 w-4" />
                </label>
                {!!results.length && (
                  <div className="mt-2 rounded-md border border-border bg-white p-2 shadow-xl">
                    {results.map((result) => (
                      <Link key={result.href} href={result.href} className="block rounded px-3 py-2 hover:bg-accent-soft" onClick={() => { setQuery(""); setIsMenuOpen(false); }}>
                        <span className="block text-sm font-semibold text-primary">{result.title}</span>
                        <span className="block truncate text-xs text-muted">{result.meta}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </form>
              <div className="flex items-center justify-between gap-4 rounded-md bg-[#f4f7fb] px-4 py-3 text-sm">
                <a className="font-medium text-primary" href={`mailto:${settings.email}`}>{settings.email}</a>
                <LanguageSwitch lang={lang} onChange={switchLanguage} />
              </div>
              <div className="space-y-2">
                {menu.map((item) => (
                  <div key={`${item.id}-${item.label}`} className="rounded-md border border-border">
                    <Link href={item.link === "#" ? "#" : item.link} className="block px-4 py-3 font-bold text-primary" onClick={() => !item.items.length && setIsMenuOpen(false)}>
                      {item.label}
                    </Link>
                    {!!item.items.length && (
                      <div className="border-t border-border bg-[#f8fafd] py-2">
                        {item.items.map((child) => (
                          <Link key={`${child.id}-${child.label}`} href={child.link} className="block px-6 py-2 text-sm leading-5 text-[#33435c] hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function LanguageSwitch({ lang, onChange }: { lang: Lang; onChange: (lang: Lang) => void }) {
  return (
    <div className="inline-grid grid-cols-2 rounded-md border border-border bg-[#f4f7fb] p-1 shadow-sm" aria-label="Мова сайту">
      {([
        ["uk", "UA"],
        ["en", "EN"],
      ] as const).map(([value, label]) => (
        <button
          key={value}
          type="button"
          className={cn(
            "h-8 min-w-10 rounded px-2 text-xs font-bold tracking-wide transition",
            lang === value ? "bg-primary text-white shadow-sm" : "text-primary hover:bg-white",
          )}
          aria-pressed={lang === value}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function isActive(pathname: string, item: MenuItem) {
  const normalizedPath = pathname.replace(/\/$/, "");
  const normalizedItem = item.link.replace(/\/$/, "");
  return (
    (item.link !== "#" && (normalizedPath === normalizedItem || (normalizedPath.match(/^\/(uk|en)$/) && normalizedItem.match(/^\/(uk|en)$/)))) ||
    item.items.some((child) => normalizedPath === child.link.replace(/\/$/, ""))
  );
}
