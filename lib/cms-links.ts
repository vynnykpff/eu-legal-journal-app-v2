import type { Lang } from "@/lib/types";

/** CMS URLs can contain another locale, repeated locale prefixes, or legacy slugs. */
export function normalizeCmsLink(lang: Lang, link: string): string {
  const value = link.trim();
  if (!value) return "#";
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(value)) return value;

  const suffixIndex = value.search(/[?#]/);
  const pathname = suffixIndex < 0 ? value : value.slice(0, suffixIndex);
  const suffix = suffixIndex < 0 ? "" : value.slice(suffixIndex);
  let path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  path = path.replace(/^(?:\/(?:uk|en))+(?=\/|$)/, "") || "/";
  path = path.replace(/^\/editor-policy(?=\/|$)/, "/editorial-policy");

  return `/${lang}${path}${suffix}`;
}
