"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { JournalCover } from "@/components/cover";
import { Icon } from "@/components/icons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select } from "@/components/ui/select";
import { Tooltip } from "@/components/ui/tooltip";
import { getLocalizedPath } from "@/lib/data";
import type { Lang, Release } from "@/lib/types";

export function ArchiveClient({ lang, releases }: { lang: Lang; releases: Release[] }) {
  const years = useMemo(() => [...new Set(releases.map((release) => release.year))], [releases]);
  const [year, setYear] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"new" | "old">("new");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return releases
      .filter((release) => year === "all" || release.year === year)
      .filter((release) => {
        if (!normalized) return true;
        return `${release.title} ${release.year} ${release.articles.map((article) => `${article.title} ${article.authors}`).join(" ")}`.toLowerCase().includes(normalized);
      })
      .sort((a, b) => sort === "new" ? compareRelease(b, a) : compareRelease(a, b));
  }, [query, releases, sort, year]);

  return (
    <section className="container mt-7">
      <div>
        <div className="mb-5 grid gap-3 md:grid-cols-[minmax(360px,1fr)_minmax(220px,0.35fr)_minmax(320px,0.5fr)]">
          <label className="flex h-12 items-center gap-2 rounded-md border border-border bg-white px-4 text-muted shadow-sm transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
            <Icon name="search" className="h-4 w-4" />
            <input className="min-w-0 flex-1 bg-transparent outline-none" placeholder="Пошук у архіві" value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
          <Select
            value={year}
            onValueChange={setYear}
            options={[{ value: "all", label: "Всі роки" }, ...years.map((item) => ({ value: item, label: item }))]}
          />
          <Select
            value={sort}
            onValueChange={(value) => setSort(value as "new" | "old")}
            options={[
              { value: "new", label: "Сортувати: спочатку нові" },
              { value: "old", label: "Сортувати: спочатку старі" },
            ]}
          />
        </div>
        <div className="mb-4 text-sm text-muted">
          Знайдено випусків: <span className="font-bold text-primary">{filtered.length}</span>
        </div>

        <Accordion className="space-y-4">
          {filtered.map((release) => {
            const key = releaseKey(release);
            return (
              <AccordionItem key={key} value={key} className="scroll-mt-24" id={key}>
                <AccordionTrigger className="p-3 sm:p-4">
                  <div className="grid flex-1 grid-cols-[72px_1fr] gap-3 sm:grid-cols-[92px_1fr] md:grid-cols-[92px_260px_1fr] md:items-center">
                    <div className="w-[72px] sm:w-auto">
                      <JournalCover compact />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold leading-tight">{release.title}</h3>
                      <div className="mt-0.5 text-sm text-muted">Опубліковано: {release.publicationDate}</div>
                      <div className="text-sm text-muted">Статті: {release.articles.length}</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-t border-border p-3 sm:p-5">
                  {!!release.articles.length && <IssueTable lang={lang} release={release} />}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        {!filtered.length && (
          <div className="rounded-md border border-dashed border-border bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-md bg-accent-soft text-primary">
              <Icon name="search" className="h-5 w-5" />
            </div>
            <h2 className="font-bold text-primary">Нічого не знайдено</h2>
            <p className="mt-2 text-sm text-muted">Спробуйте змінити рік, сортування або пошуковий запит.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export function IssueTable({ lang, release }: { lang: Lang; release: Release }) {
  return (
    <>
      <div className="grid gap-3 md:hidden">
        {release.articles.map((article, index) => (
          <article key={article.slug} className="rounded-md border border-border bg-white p-4 shadow-sm transition hover:border-accent">
            <div className="mb-2 flex items-center justify-between gap-3 text-xs font-semibold text-muted">
              <span>#{index + 1}</span>
              <span>{article.pages ? `С. ${article.pages}` : "Сторінки -"}</span>
            </div>
            <Link
              className="block text-base font-bold leading-6 text-primary transition hover:text-[#0b3d91] hover:underline hover:underline-offset-4"
              href={getLocalizedPath(lang, `/articles/${article.slug}`)}
            >
              {article.title}
            </Link>
            <div className="mt-2 text-sm leading-6 text-[#33435c]">{article.authors || "-"}</div>
            {article.file && (
              <a
                className="mt-4 inline-flex h-10 items-center gap-2 rounded-md border border-border px-3 text-sm font-semibold text-primary transition hover:border-accent hover:bg-accent-soft"
                href={article.file}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="file" className="h-4 w-4" />
                PDF
              </a>
            )}
          </article>
        ))}
      </div>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[840px] table-fixed border-collapse text-left text-sm">
        <colgroup>
          <col className="w-12" />
          <col />
          <col className="w-[280px]" />
          <col className="w-28" />
        </colgroup>
        <thead className="text-muted">
          <tr>
            <th className="py-2 pr-3">#</th>
            <th className="px-3 py-2">Назва</th>
            <th className="px-3 py-2">Автори</th>
            <th className="px-3 py-2">Сторінки</th>
            <th className="px-3 py-2 text-center">PDF</th>
          </tr>
        </thead>
        <tbody>
          {release.articles.map((article, index) => (
            <tr key={article.slug} className="border-t border-border transition hover:bg-[#fbfcff]">
              <td className="py-3 pr-3 align-top">{index + 1}</td>
              <td className="px-3 py-3 align-top font-semibold leading-6 text-primary">
                <Link className="hover:text-[#0b3d91] hover:underline hover:underline-offset-4" href={getLocalizedPath(lang, `/articles/${article.slug}`)}>{article.title}</Link>
              </td>
              <td className="px-3 py-3 align-top leading-6">{article.authors || "-"}</td>
              <td className="whitespace-nowrap px-3 py-3 align-top">{article.pages || "-"}</td>
              <td className="px-3 py-3 text-center align-top">
                {article.file ? (
                  <Tooltip content="Переглянути PDF">
                    <a className="inline-grid h-9 w-9 place-items-center rounded-md border border-border text-primary transition hover:border-accent hover:bg-accent-soft" href={article.file} target="_blank" rel="noreferrer" aria-label={`PDF ${article.title}`}>
                      <Icon name="file" className="h-4 w-4" />
                    </a>
                  </Tooltip>
                ) : (
                  <span className="text-muted">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </>
  );
}

function releaseKey(release: Release) {
  return `${release.year}-${release.issueNumber ?? release.title}`;
}

function compareRelease(a: Release, b: Release) {
  const year = Number(a.year.match(/\d+/)?.[0] ?? 0) - Number(b.year.match(/\d+/)?.[0] ?? 0);
  if (year) return year;
  return Number(a.issueNumber?.match(/\d+/)?.[0] ?? 0) - Number(b.issueNumber?.match(/\d+/)?.[0] ?? 0);
}
