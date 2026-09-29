import type { Article, Lang, MenuItem } from "@/lib/types";

export type SearchEntry = {
  title: string;
  href: string;
  meta: string;
};

export function makeSearchEntries(lang: Lang, articles: Article[], menu: MenuItem[]): SearchEntry[] {
  const articleEntries = articles.map((article) => ({
    title: article.title,
    href: `/${lang}/articles/${article.slug}`,
    meta: article.authors || article.pages || "Стаття",
  }));
  const menuEntries = menu
    .flatMap((item) => [
      { title: item.label, href: item.link, meta: "Сторінка" },
      ...item.items.map((child) => ({ title: child.label, href: child.link, meta: item.label })),
    ])
    .filter((entry) => entry.href !== "#");

  return [...menuEntries, ...articleEntries];
}
