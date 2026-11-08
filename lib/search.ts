import type { Article, Lang, MenuItem } from "@/lib/types";

import { getDictionary } from "@/lib/i18n";

export type SearchEntry = {
  title: string;
  href: string;
  meta: string;
};

export function makeSearchEntries(lang: Lang, articles: Article[], menu: MenuItem[]): SearchEntry[] {
  const dict = getDictionary(lang);
  const articleEntries = articles.map((article) => ({
    title: article.title,
    href: `/${lang}/articles/${article.slug}`,
    meta: article.authors || article.pages || dict.common.article,
  }));
  const menuEntries = menu
    .flatMap((item) => [
      { title: item.label, href: item.link, meta: dict.common.page },
      ...item.items.map((child) => ({ title: child.label, href: child.link, meta: item.label })),
    ])
    .filter((entry) => entry.href !== "#");

  return [...menuEntries, ...articleEntries];
}
