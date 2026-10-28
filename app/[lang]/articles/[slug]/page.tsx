import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { IdentifierLink, ReferenceCitation } from "@/components/article-links";
import { Shell } from "@/components/layout";
import { PageHero } from "@/components/sections";
import { Card, ButtonLink } from "@/components/ui";
import { Icon } from "@/components/icons";
import { BackToTop } from "@/components/back-to-top";
import { getArticle } from "@/lib/cms";
import { getLang } from "@/lib/routing";

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const resolved = await params;
  const lang = await getLang(Promise.resolve({ lang: resolved.lang }));
  const article = await getArticle(lang, resolved.slug);

  if (!article) notFound();

  const labels = lang === "en"
    ? {
        abstract: "Abstract",
        authors: "Authors",
        affiliation: "Affiliation",
        info: "Article details",
        issue: "Issue",
        journal: "Journal",
        keywords: "Keywords",
        pages: "Pages",
        published: "Publication date",
        references: "References",
      }
    : {
        abstract: "Анотація",
        authors: "Автори",
        affiliation: "Афіліація",
        info: "Інформація",
        issue: "Випуск",
        journal: "Журнал",
        keywords: "Ключові слова",
        pages: "Сторінки",
        published: "Дата публікації",
        references: "Список джерел",
      };
  const authorNames = article.structuredAuthors?.length
    ? article.structuredAuthors.map((author) => [author.given_name, author.family_name].filter(Boolean).join(" ")).filter(Boolean).join(", ")
    : article.authors;

  return (
    <Shell lang={lang}>
      <PageHero title={article.title} description={article.authors || "Наукова стаття Європейського правничого часопису."} />
      <section className="container mt-7 grid gap-6 lg:grid-cols-[1fr_280px]">
        <Card className="prose-journal p-6">
          <dl className="mb-7 grid gap-3 border-b border-border pb-6 sm:grid-cols-2">
            <ArticleDetail label={labels.authors} value={authorNames} />
            <ArticleDetail label="DOI" value={article.doi && <IdentifierLink type="doi" value={article.doi} />} />
            <ArticleDetail label={labels.journal} value={article.journalTitle ?? "Європейський правничий часопис"} />
            <ArticleDetail label={labels.issue} value={article.issue} />
            <ArticleDetail label={labels.pages} value={article.pages} />
            <ArticleDetail label={labels.published} value={article.publishedAt} />
          </dl>

          {!!article.structuredAuthors?.length && (
            <>
              <h2>{labels.authors}</h2>
              <ul className="space-y-3 pl-0">
                {article.structuredAuthors.map((author, index) => (
                  <li className="list-none rounded-md border border-border bg-[#f8fafd] p-4" key={`${author.family_name}-${index}`}>
                    <strong>{[author.given_name, author.family_name].filter(Boolean).join(" ")}</strong>
                    {author.orcid && <div className="mt-1"><IdentifierLink type="orcid" value={author.orcid} /></div>}
                    {author.affiliation && <div className="mt-1 text-sm text-muted">{labels.affiliation}: {author.affiliation}</div>}
                  </li>
                ))}
              </ul>
            </>
          )}

          {article.abstract && (
            <>
              <h2>{labels.abstract}</h2>
              <p>{article.abstract}</p>
            </>
          )}
          {article.keywords && <p><b>{labels.keywords}:</b> {article.keywords}</p>}

          <h2>Бібліографічні дані</h2>
          <p>{article.authors}. {article.title}. Європейський правничий часопис. {article.publishedAt}. С. {article.pages || "—"}.</p>

          {!!article.references?.length && (
            <>
              <h2>{labels.references}</h2>
              <ol className="list-decimal space-y-2 pl-5">
                {article.references.map((reference, index) => (
                  <li key={reference.key ?? index}><ReferenceCitation reference={reference} /></li>
                ))}
              </ol>
            </>
          )}
        </Card>
        <Card className="h-fit p-5">
          <h2 className="mb-4 font-bold">{labels.info}</h2>
          <div className="space-y-3 text-sm">
            <div><b>{labels.authors}</b><br />{authorNames || "-"}</div>
            <div><b>{labels.pages}</b><br />{article.pages || "-"}</div>
            <div><b>DOI</b><br />{article.doi ? <IdentifierLink type="doi" value={article.doi} /> : "-"}</div>
          </div>
          {!!article.structuredAuthors?.length && (
            <div className="mt-5 border-t border-border pt-4">
              <h3 className="mb-3 text-sm font-bold">Авторські ідентифікатори</h3>
              <div className="space-y-3 text-sm">
                {article.structuredAuthors.map((author, index) => (
                  <div key={`${author.family_name}-${index}`}>
                    <div className="font-semibold">{[author.given_name, author.family_name].filter(Boolean).join(" ")}</div>
                    {author.orcid && <IdentifierLink type="orcid" value={author.orcid} />}
                    {author.affiliation && <div className="text-muted">{author.affiliation}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {article.file && <ButtonLink className="mt-5 w-full" href={article.file}><Icon name="file" className="h-4 w-4" />PDF</ButtonLink>}
        </Card>
      </section>
      <BackToTop label={lang === "en" ? "Back to top" : "До початку"} />
    </Shell>
  );
}

function ArticleDetail({ label, value }: { label: string; value?: ReactNode }) {
  if (!value) return null;

  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-1 [overflow-wrap:anywhere] text-sm leading-6 text-[#33435c]">{value}</dd>
    </div>
  );
}
