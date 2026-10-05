import { fallbackReleases, getAllArticles } from "@/lib/data";
import type { Article, CmsPage, Lang, MenuItem, Release, SiteSettings } from "@/lib/types";

const CMS_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.STRAPI_API_URL ??
  (process.env.NODE_ENV === "development" ? "http://localhost:1337" : "https://cms.legal-journal.e-u.edu.ua");
const API_URL = `${CMS_URL.replace(/\/$/, "")}/api`;
const LOCAL_HEADER_LOGO = "/images/header-logo.svg";
const LOCAL_FOOTER_LOGO = "/images/footer-logo.svg";

type StrapiItem<T> = { id?: number; attributes?: T } & T;

function attrs<T>(item: StrapiItem<T> | null | undefined): T {
  if (!item) return {} as T;
  return (item.attributes ?? item) as T;
}

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_URL}${path}`, { next: { revalidate: 300 } });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getReleases(lang: Lang): Promise<Release[]> {
  const archive = await fetchJson<{ data?: StrapiItem<{ year?: string; releases?: { data?: StrapiItem<Record<string, unknown>>[] } | StrapiItem<Record<string, unknown>>[] }>[] }>(
    `/archives?populate[releases][populate][releases][populate]=*&locale=${lang}`,
  );

  if (archive?.data?.length) {
    const releases = archive.data.flatMap((yearItem) => {
      const yearAttrs = attrs(yearItem);
      const rawReleases = Array.isArray(yearAttrs.releases) ? yearAttrs.releases : yearAttrs.releases?.data ?? [];

      return rawReleases.map((rawRelease) => {
        const release = attrs(rawRelease);
        const rawArticles =
          getRelationArray(release.articles) ??
          getRelationArray(release.releases) ??
          [];

        return {
          id: rawRelease.id,
          title: String(release.title ?? "Випуск"),
          issueNumber: stringValue(release.issueNumber ?? release.issue_number),
          year: String(release.publicationYear ?? release.publication_year ?? yearAttrs.year ?? ""),
          publicationDate: normalizePublicationDate(release, yearAttrs.year),
          description: "Актуальні дослідження у сфері права та правозастосування в Україні, Європі та світі.",
          pdf: mediaUrl(release.file),
          articles: rawArticles.map(normalizeArchiveArticle),
        } satisfies Release;
      });
    });

    if (releases.length) return sortReleases(releases);
  }

  const articles = await fetchJson<{ data?: StrapiItem<Record<string, unknown>>[] }>(`/articles?populate=*&locale=${lang}`);
  if (articles?.data?.length) {
    return [{
      title: lang === "uk" ? "Поточний випуск" : "Current issue",
      year: "2026",
      publicationDate: "15 травня 2026",
      description: "Матеріали з CMS Strapi.",
      articles: articles.data.map(normalizeBlogArticle),
    }];
  }

  return sortReleases(fallbackReleases);
}

export async function getArticle(lang: Lang, slug: string): Promise<Article | null> {
  const remoteArticle = await getCrossrefArticle(lang, slug);
  if (remoteArticle) return hydrateArticleText(remoteArticle);

  const releases = await getReleases(lang);
  const article = getAllArticles(releases).find((item) => (
    item.slug === slug ||
    String(item.id) === slug ||
    (item.id ? `article-${item.id}` === slug : false)
  )) ?? null;
  if (!article) return null;

  return hydrateArticleText(article);
}

async function hydrateArticleText(article: Article): Promise<Article> {
  if (article.file && !article.fullText?.length) {
    return {
      ...article,
      fullText: await extractPdfText(article.file),
    };
  }

  return article;
}

async function extractPdfText(file: string): Promise<string[] | undefined> {
  try {
    const response = await fetch(file, { cache: "no-store" });
    if (!response.ok) return undefined;

    const { PDFParse } = await import("pdf-parse");
    const parser = new PDFParse({ data: Buffer.from(await response.arrayBuffer()) });
    const result = await parser.getText();
    await parser.destroy();

    return normalizePdfText(result.text);
  } catch {
    return undefined;
  }
}

function normalizePdfText(text: string): string[] {
  return text
    .replace(/\r/g, "\n")
    .replace(/-\n(?=\p{Ll})/gu, "")
    .replace(/(?<![.!?:;])\n(?!\n)/g, " ")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter((paragraph) => paragraph.length > 20)
    .slice(0, 80);
}

async function getCrossrefArticle(lang: Lang, slug: string): Promise<Article | null> {
  const payload = await fetchJson<{
    article?: Record<string, unknown>;
    release?: Record<string, unknown>;
  }>(`/crossref/articles/${encodeURIComponent(slug)}?locale=${lang}`);

  if (!payload?.article) return null;

  const article = payload.article;
  const release = payload.release ?? {};
  return {
    id: typeof article.id === "number" ? article.id : undefined,
    title: String(article.title ?? ""),
    slug: String(article.slug ?? slug),
    authors: String(article.authors ?? ""),
    pages: String(article.pages ?? [article.firstPage ?? article.first_page, article.lastPage ?? article.last_page].filter(Boolean).join("-")),
    journalTitle: stringValue((payload as { journal?: Record<string, unknown> }).journal?.title),
    issue: [
      release.issueNumber ?? release.issue_number ?? release.title,
      release.publicationYear ?? release.publication_year,
    ].filter(Boolean).join(", "),
    doi: stringValue(article.doi),
    file: mediaUrl(article.file) ?? stringValue(article.file),
    publishedAt: stringValue(release.printPublicationDate ?? release.print_publication_date),
    abstract: stringValue(article.abstract),
    keywords: stringValue(article.keywords),
    fullText: normalizeFullText(article.fullText ?? article.full_text ?? article.content ?? article.body ?? article.text ?? article.blocks),
    references: Array.isArray(article.references) ? article.references as Article["references"] : undefined,
    structuredAuthors: normalizeStructuredAuthors(article.structuredAuthors ?? article.structured_authors),
  };
}

export async function getMainMenu(lang: Lang): Promise<MenuItem[]> {
  const payload = await fetchJson<{ data?: StrapiItem<{ items?: StrapiItem<Record<string, unknown>>[] }> }>(
    `/main-menu?populate[items][populate]=*&locale=${lang}`,
  );
  const items = attrs(payload?.data ?? {}).items;

  if (!Array.isArray(items)) return [];

  return items.map((item) => {
    const menuItem = attrs(item);
    return {
      id: item.id,
      label: String(menuItem.label ?? ""),
      link: normalizeCmsLink(lang, stringValue(menuItem.link) ?? "#"),
      items: getRelationArray(menuItem.item)?.map((child) => {
        const childItem = attrs(child);
        return {
          id: child.id,
          label: String(childItem.label ?? ""),
          link: normalizeCmsLink(lang, stringValue(childItem.link) ?? "#"),
        };
      }) ?? [],
    };
  });
}

export async function getSiteSettings(lang: Lang): Promise<SiteSettings> {
  const [settingPayload, navbarPayload, mainMenuPayload] = await Promise.all([
    fetchJson<{ data?: StrapiItem<Record<string, unknown>> }>(`/setting?populate=*&locale=${lang}`),
    fetchJson<{ data?: StrapiItem<Record<string, unknown>> }>(`/navbar?populate[items][populate]=*&locale=${lang}`),
    fetchJson<{ data?: StrapiItem<Record<string, unknown>> }>(`/main-menu?populate=*&locale=${lang}`),
  ]);
  const setting = attrs(settingPayload?.data ?? {});
  const navbar = attrs(navbarPayload?.data ?? {});
  const mainMenu = attrs(mainMenuPayload?.data ?? {});

  return {
    email: String(navbar.email ?? "legal.journal@e-u.edu.ua"),
    issn: String(mainMenu.issn ?? "3041-1149"),
    logoHeader: LOCAL_HEADER_LOGO,
    logoFooter: LOCAL_FOOTER_LOGO,
    copyrights: String(setting.copyrights ?? "© Європейський правничий часопис"),
  };
}

export async function getCmsPages(lang: Lang): Promise<CmsPage[]> {
  const payload = await fetchJson<{ data?: StrapiItem<Record<string, unknown>>[] }>(
    `/pages?populate[content][populate]=*&populate[metaData][populate]=*&locale=${lang}`,
  );

  return (payload?.data ?? []).map((rawPage) => {
    const page = attrs(rawPage);
    const content = getRelationArray(page.content) ?? [];
    return {
      title: String(page.title ?? titleFromPath(String(page.url ?? ""))),
      url: normalizeCmsLink(lang, String(page.url ?? "")),
      description: content.find((block) => String(attrs(block).__component ?? "").includes("text"))
        ? String(attrs(content.find((block) => String(attrs(block).__component ?? "").includes("text")) ?? {}).content ?? "").slice(0, 180)
        : "",
      content: content.map((block) => {
        const normalized = attrs(block);
        return {
          component: String(normalized.__component ?? ""),
          content: normalized.content ? String(normalized.content) : undefined,
          items: Array.isArray(normalized.items) ? normalized.items.map(normalizeListItem) : undefined,
          isShowListMarks: Boolean(normalized.isShowListMarks),
          link: normalized.link ? String(normalized.link) : undefined,
        };
      }),
    };
  });
}

export async function getCmsPageByPath(lang: Lang, path: string): Promise<CmsPage | null> {
  const pages = await getCmsPages(lang);
  const normalizedPath = normalizeCmsLink(lang, path);
  return pages.find((page) => page.url.replace(/\/$/, "") === normalizedPath.replace(/\/$/, "")) ?? null;
}

function normalizeArchiveArticle(raw: StrapiItem<Record<string, unknown>>): Article {
  const article = attrs(raw);
  const slug = stringValue(article.slug) ?? (raw.id ? `article-${raw.id}` : slugify(String(article.title ?? "")));
  return {
    id: raw.id,
    title: String(article.title ?? ""),
    slug,
    authors: String(article.authors ?? ""),
    pages: String(article.pages ?? [article.firstPage ?? article.first_page, article.lastPage ?? article.last_page].filter(Boolean).join("-")),
    file: mediaUrl(article.file),
    doi: article.doi ? String(article.doi) : undefined,
    abstract: article.abstract ? String(article.abstract) : undefined,
    keywords: article.keywords ? String(article.keywords) : undefined,
    fullText: normalizeFullText(article.fullText ?? article.full_text ?? article.content ?? article.body ?? article.text ?? article.blocks),
    references: Array.isArray(article.references) ? article.references as Article["references"] : undefined,
    structuredAuthors: normalizeStructuredAuthors(article.structuredAuthors ?? article.structured_authors),
  };
}

function normalizeBlogArticle(raw: StrapiItem<Record<string, unknown>>): Article {
  const article = attrs(raw);
  const author = attrs((article.author as StrapiItem<Record<string, unknown>>) ?? {});
  return {
    id: raw.id,
    title: String(article.title ?? ""),
    slug: String(article.slug ?? raw.id ?? ""),
    authors: String(author.name ?? ""),
    pages: "",
    description: article.description ? String(article.description) : undefined,
    abstract: article.description ? String(article.description) : undefined,
    file: mediaUrl(article.cover),
    fullText: normalizeFullText(article.blocks ?? article.content ?? article.body),
  };
}

function mediaUrl(value: unknown): string | undefined {
  if (typeof value === "string") {
    if (!value) return undefined;
    return value.startsWith("http") ? value : `${CMS_URL.replace(/\/$/, "")}${value.startsWith("/") ? value : `/${value}`}`;
  }

  const maybe = value as { data?: StrapiItem<{ url?: string }> } | StrapiItem<{ url?: string }> | undefined;
  const url = maybe && "data" in maybe && maybe.data ? attrs(maybe.data).url : attrs((maybe ?? {}) as StrapiItem<{ url?: string }>).url;
  if (!url) return undefined;
  return url.startsWith("http") ? url : `${CMS_URL.replace(/\/$/, "")}${url}`;
}

function getRelationArray(value: unknown): StrapiItem<Record<string, unknown>>[] | null {
  if (Array.isArray(value)) return value.filter(Boolean) as StrapiItem<Record<string, unknown>>[];
  const relation = value as { data?: StrapiItem<Record<string, unknown>>[] } | undefined;
  return Array.isArray(relation?.data) ? relation.data.filter(Boolean) : null;
}

function stringValue(value: unknown): string | undefined {
  if (value === null || value === undefined || value === "") return undefined;
  return String(value);
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");
}

function sortReleases(releases: Release[]): Release[] {
  return [...releases].sort((a, b) => {
    const yearDelta = numberValue(b.year) - numberValue(a.year);
    if (yearDelta !== 0) return yearDelta;

    const issueDelta = numberValue(b.issueNumber ?? b.title) - numberValue(a.issueNumber ?? a.title);
    if (issueDelta !== 0) return issueDelta;

    return b.title.localeCompare(a.title, "uk");
  });
}

function numberValue(value: string | undefined): number {
  if (!value) return 0;
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function normalizePublicationDate(release: Record<string, unknown>, archiveYear: unknown): string {
  return stringValue(
    release.printPublicationDate ??
    release.print_publication_date ??
    release.publicationDate ??
    release.publication_date ??
    release.publishedAt ??
    release.published_at ??
    release.date,
  ) ?? String(release.publicationYear ?? release.publication_year ?? archiveYear ?? "");
}

function normalizeCmsLink(lang: Lang, link: string): string {
  if (!link || link === "#") return "#";
  if (link.startsWith("http")) return link;
  const clean = link.startsWith("/") ? link : `/${link}`;
  if (clean === `/${lang}`) return `/${lang}/`;
  if (clean.startsWith(`/${lang}/`)) return clean;
  if (clean === "/") return `/${lang}/`;
  return `/${lang}${clean}`;
}

function titleFromPath(path: string): string {
  return path
    .split("/")
    .filter(Boolean)
    .at(-1)
    ?.replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase()) ?? "Сторінка";
}

function normalizeListItem(item: unknown): string {
  if (typeof item === "string") return item;
  if (item && typeof item === "object" && "content" in item) {
    const content = (item as { content?: unknown }).content;
    return content === null || content === undefined ? "" : String(content);
  }
  return String(item ?? "");
}

function normalizeFullText(value: unknown): string[] | undefined {
  if (Array.isArray(value)) {
    const paragraphs = value.flatMap(extractTextFragments).map(cleanText).filter(Boolean);
    return paragraphs.length ? paragraphs : undefined;
  }

  if (typeof value === "string") {
    const paragraphs = value
      .split(/\n{2,}|<\/p>/i)
      .map((item) => item.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim())
      .filter(Boolean);
    return paragraphs.length ? paragraphs : undefined;
  }

  return undefined;
}

function normalizeStructuredAuthors(value: unknown): Article["structuredAuthors"] | undefined {
  return Array.isArray(value) ? value as Article["structuredAuthors"] : undefined;
}

function extractTextFragments(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (value === null || value === undefined) return [];

  if (Array.isArray(value)) {
    return value.flatMap(extractTextFragments);
  }

  if (typeof value === "object") {
    const item = value as Record<string, unknown>;
    const direct = [item.text, item.content, item.body].flatMap(extractTextFragments);
    const nested = [item.children, item.items, item.blocks].flatMap(extractTextFragments);
    return [...direct, ...nested];
  }

  return [];
}

function cleanText(value: string): string {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
