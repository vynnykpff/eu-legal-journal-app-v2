import Link from "next/link";
import { Badge, ButtonLink, Card, LinkButton } from "@/components/ui";
import { Icon } from "@/components/icons";
import { JournalCover } from "@/components/cover";
import { ArchiveClient, IssueTable } from "@/components/archive-client";
import { renderInlineMarkdown } from "@/components/inline-markdown";
import { normalizeMarkdownSyntax, plainMarkdown } from "@/lib/markdown";
import { getArticleCount, getLocalizedPath, indexingServices, journalTasks, pages } from "@/lib/data";
import editorialBoardFallback from "@/lib/editorial-board-fallback.json";
import type { CmsBlock, Lang, Release, StaticPage } from "@/lib/types";

export function Hero({ submissionPath }: { submissionPath: string }) {
  return (
    <section className="watermark border-b border-border py-7 md:py-10">
      <div className="container grid gap-7 xl:grid-cols-[minmax(0,1fr)_320px_300px] lg:gap-8">
        <div className="pt-2 md:pt-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent sm:text-sm">Науковий журнал</div>
          <h1 className="journal-title text-4xl font-bold leading-tight text-primary sm:text-5xl md:text-6xl">Європейський<br />правничий часопис</h1>
          <p className="mt-3 text-xl font-semibold uppercase tracking-[0.16em] text-[#4a5365]">European Legal Journal</p>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#33435c]">Журнал включено до Переліку наукових фахових видань України (категорія «Б») відповідно до наказу МОН України від 11 червня 2026 року № 928 (Додаток 14) зі спеціальностей: D8 Право, D9 Міжнародне право.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Badge><Icon name="star" className="h-4 w-4 text-accent" />Категорія «Б»</Badge>
            <Badge><Icon name="building" className="h-4 w-4" />Кластер: Право</Badge>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href={submissionPath}><Icon name="file" className="h-4 w-4" />Подати статтю</LinkButton>
          </div>
        </div>
        <div className="justify-self-center"><JournalCover /></div>
        <Card className="h-fit p-5">
          <h2 className="mb-4 text-lg font-bold">Про видання</h2>
          {[
            ["building", "Засновник та видавець", "ПВНЗ «Європейський університет»"],
            ["building", "Код за ЄДРПОУ видавця", "24366800"],
            ["calendar", "Рік заснування", "2023"],
            ["clock", "Періодичність", "У міру накопичення"],
            ["globe", "Мови публікацій", "Українська, англійська"],
            ["link", "DOI prefix", "10.36919"],
            ["link", "ROR видавця", "https://ror.org/032s10s29"],
            ["file", "Ідентифікатор медіа", "R30-01886"],
          ].map(([icon, label, value]) => (
            <div key={label} className="flex gap-3 border-b border-border py-3 last:border-0">
              <Icon name={icon} className="mt-1 h-5 w-5 text-primary" />
              <div><div className="text-sm font-bold">{label}</div><div className="break-words text-xs text-muted">{value.startsWith("https://") ? <a href={value} className="underline underline-offset-2" target="_blank" rel="noreferrer">{value}</a> : value}</div></div>
            </div>
          ))}
        </Card>
      </div>
    </section>
  );
}

export function HomeCards({ lang, latest, licensePath }: { lang: Lang; latest: Release; licensePath: string }) {
  const cards = [
    { title: "Поточний випуск", href: getLocalizedPath(lang, "/current-issue"), icon: "book", body: null, cover: true },
    { title: "Ліцензія", href: licensePath, icon: "file", body: <>Усі статті з 2026 року розповсюджуються на умовах ліцензії <a href="https://creativecommons.org/licenses/by/4.0/" className="font-semibold underline underline-offset-2" target="_blank" rel="noreferrer">Creative Commons Attribution BY 4.0 (CC BY 4.0)</a>.</> },
    { title: "Індексація", href: getLocalizedPath(lang, "/indexing"), icon: "globe", body: indexingServices.map(({ label }) => label).join(", ") },
    { title: "Рубрики Журналу", href: getLocalizedPath(lang, "/journal-rubrics"), icon: "shield", body: "Наукові напрями та рубрики журналу." },
  ];
  return (
    <section className="container mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="flex h-full flex-col p-5 transition duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-lg md:p-6">
          <div className="mb-4 flex items-center gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-primary text-white"><Icon name={card.icon} className="h-5 w-5" /></span><h2 className="text-lg font-bold text-primary">{card.title}</h2></div>
          {card.cover && <div className="mb-3 flex gap-4"><JournalCover compact /><div><div className="font-bold">{latest.title}</div><div className="mt-1 text-xs text-muted">Опубліковано: {latest.publicationDate}</div></div></div>}
          {card.body && <div className="min-h-14 text-sm leading-6 text-[#33435c]">{card.body}</div>}
          <Link className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-primary transition hover:gap-3 hover:text-[#0b3d91]" href={card.href}>Детальніше <Icon name="arrow" className="h-4 w-4" /></Link>
        </Card>
      ))}
    </section>
  );
}

export function JournalPurpose() {
  return (
    <section className="container mt-8">
      <Card className="border-l-4 border-l-accent p-5 md:p-6">
        <h2 className="text-2xl font-bold text-primary">Мета видання</h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-[#33435c]">Мета видання - оприлюднення результатів наукових досліджень у галузі права шляхом висвітлення актуальних проблем юридичної науки та практики, а також сприяння вдосконаленню національного законодавства та правозастосовної діяльності. Журнал прагне інтегрувати українську правову думку в європейський та світовий науковий простір.</p>
      </Card>
      <div className="mt-6 rounded-md bg-[#edf3ff] px-6 py-5 text-primary">
        <h2 className="text-xl font-bold">Завдання видання:</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">{journalTasks.map((task) => <li key={task}>{task}</li>)}</ul>
      </div>
    </section>
  );
}

export function PageHero({ title, description }: { title: string; description?: string }) {
  return (
    <section className="watermark border-b border-border py-6 md:py-9">
      <div className="container">
        <nav className="mb-3 flex flex-wrap items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
          <Link className="transition hover:text-primary hover:underline hover:underline-offset-4" href="/uk/">Головна</Link>
          <span>›</span>
          <span>{title}</span>
        </nav>
        <h1 className="journal-title text-[2rem] font-bold leading-tight text-primary sm:text-4xl md:text-5xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl leading-6 text-[#33435c]">{renderInlineMarkdown(description)}</p>}
        <div className="mt-5 flex flex-wrap gap-3">
          <Badge><Icon name="star" className="h-4 w-4 text-accent" />Категорія «Б»</Badge>
          <Badge><Icon name="building" className="h-4 w-4" />Кластер: Право</Badge>
        </div>
      </div>
    </section>
  );
}

export function ArchiveList({ lang, releases }: { lang: Lang; releases: Release[] }) {
  return <ArchiveClient lang={lang} releases={releases} />;
}

export function ReleaseCard({ lang, release, showActions = true, showArticles = true }: { lang: Lang; release: Release; showActions?: boolean; showArticles?: boolean }) {
  return (
    <Card className="grid gap-3 p-3 md:grid-cols-[92px_260px_1fr_190px] md:items-center">
      <JournalCover compact />
      <div><h3 className="text-lg font-bold leading-tight">{release.title}</h3><div className="text-sm text-muted">Опубліковано: {release.publicationDate}</div><div className="text-sm text-muted">Статті: {getArticleCount(release)}</div></div>
      <div />
      {showActions ? <div className="grid gap-2"><LinkButton href={getLocalizedPath(lang, "/current-issue")}><Icon name="book" className="h-4 w-4" />Переглянути</LinkButton><ButtonLink href={release.pdf ?? "#"} variant="outline"><Icon name="file" className="h-4 w-4" />PDF</ButtonLink></div> : <div />}
      {showArticles && !!release.articles.length && <div className="md:col-span-4 border-t border-border pt-3"><IssueArticles lang={lang} release={release} /></div>}
    </Card>
  );
}

export function IssueArticles({ lang, release }: { lang: Lang; release: Release }) {
  return (
    <div className="overflow-x-auto">
      <IssueTable lang={lang} release={release} />
    </div>
  );
}

export function StaticContent({ page }: { page: StaticPage }) {
  return (
    <section className="container mt-7">
      <Card className="prose-journal p-6">
        {page.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.list ? <ul className="list-disc pl-6">{section.body.map((text) => <li key={text}>{renderInlineMarkdown(text)}</li>)}</ul> : section.body.map((text) => <p key={text}>{renderInlineMarkdown(text)}</p>)}</section>)}
      </Card>
    </section>
  );
}

export function EditorialBoard() {
  // Public CMS snapshot keeps verified profiles available when the CMS is offline.
  return <CmsEditorialBoard blocks={editorialBoardFallback} />;
}

export function CmsEditorialBoard({ blocks }: { blocks: CmsBlock[] }) {
  const members = parseEditorialMembers(blocks);

  if (!members.length) {
    return <CmsContent blocks={blocks} />;
  }

  const countryCounts = members.reduce<Record<string, number>>((counts, member) => {
    if (member.country) counts[member.country] = (counts[member.country] ?? 0) + 1;
    return counts;
  }, {});

  return (
    <section className="container mt-7 grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start">
      <div className="grid gap-4 sm:grid-cols-2">
        {members.map((member, index) => (
          <Card key={`${member.name}-${index}`} className="flex min-h-[250px] flex-col p-5">
            <div className="flex items-start gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-md bg-primary text-lg font-bold text-white">
                {getInitials(member.name)}
              </div>
              <div className="min-w-0">
                <div className={index < 2 ? "mb-2 inline-flex rounded bg-accent px-2.5 py-1 text-xs font-bold text-primary" : "mb-2 inline-flex rounded bg-accent-soft px-2.5 py-1 text-xs font-bold text-primary"}>
                  {member.role}
                </div>
                <h3 className="text-lg font-bold leading-snug text-primary">{member.name}</h3>
              </div>
            </div>

            {member.bio && <p className="mt-4 text-sm leading-6 text-[#33435c]">{renderInlineMarkdown(member.bio)}</p>}

            <div className="mt-auto grid gap-3 border-t border-border pt-4 text-sm">
              {member.country && (
                <div className="flex items-center gap-3">
                  <CountryFlag country={member.country} />
                  <span className="text-[#33435c]">{member.country}</span>
                </div>
              )}
              {member.email && (
                <a className="flex items-center gap-3 text-primary underline-offset-4 hover:underline" href={`mailto:${member.email}`}>
                  <Icon name="mail" className="h-4 w-4 shrink-0" />
                  <span className="break-all">{member.email}</span>
                </a>
              )}
              {!!member.identifiers.length && (
                <div className="flex flex-wrap gap-2">
                  {member.identifiers.map((identifier) => (
                    <a key={identifier.href} href={identifier.href} target="_blank" rel="noreferrer" className="inline-flex rounded border border-[#dfe8c5] px-2 py-1 text-xs font-semibold text-[#5d7b16] underline-offset-4 transition hover:bg-[#f3f7e9] hover:underline">
                      {identifier.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card className="sticky top-5 h-fit p-5">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-md bg-primary text-white">
            <Icon name="users" className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-bold text-primary">Склад редколегії</h2>
            <p className="text-sm text-muted">Окремі профілі учасників</p>
          </div>
        </div>
        <div className="mt-5 rounded-md bg-[#f4f7fb] p-4 text-center">
          <div className="text-sm text-muted">Загальна кількість членів</div>
          <b className="mt-1 block text-4xl text-primary">{members.length}</b>
        </div>
        <div className="mt-5 space-y-3 text-sm">
          {Object.entries(countryCounts).map(([country, count]) => (
            <div key={country} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
              <span className="flex items-center gap-2 text-[#33435c]"><CountryFlag country={country} />{country}</span>
              <b className="text-primary">{count}</b>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

function CountryFlag({ country }: { country: string }) {
  const code = /україн|ukrain/i.test(country) ? "UA"
    : /польщ|poland|polish/i.test(country) ? "PL"
    : /швеці|sweden|swedish/i.test(country) ? "SE"
    : /чех|чеськ|czech/i.test(country) ? "CZ"
    : null;

  if (!code) return null;

  const flag = [...code].map((letter) => String.fromCodePoint(127397 + letter.charCodeAt(0))).join("");
  return <span aria-hidden="true" className="shrink-0 text-lg leading-none">{flag}</span>;
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

type EditorialMemberCard = {
  role: string;
  name: string;
  bio: string;
  country: string;
  email: string;
  identifiers: { label: string; href: string }[];
};

function parseEditorialMembers(blocks: { content?: string; items?: string[] }[]): EditorialMemberCard[] {
  const lines = blocks
    .flatMap((block) => [block.content, ...(block.items ?? [])])
    .filter((value): value is string => Boolean(value))
    .flatMap((value) => normalizeMarkdownSyntax(value).split(/\n+/))
    .map((line) => line.trim())
    .filter(Boolean);

  const members: EditorialMemberCard[] = [];
  let currentRole = "";
  let currentMember: EditorialMemberCard | null = null;

  const commit = () => {
    if (currentMember?.name) members.push(currentMember);
    currentMember = null;
  };

  for (const markdownLine of lines) {
    const line = plainMarkdown(markdownLine).trim();
    if (isEditorialRole(line)) {
      commit();
      currentRole = line.replace(/^Члени редакційної колегії/i, "Член редакційної колегії").replace(/^Editorial board members/i, "Editorial board member");
      continue;
    }

    const email = line.match(/email:\s*([^\s,;]+)/i);
    if (email && currentMember) {
      currentMember.email = email[1];
      continue;
    }

    if (isIdentifierLine(line) && currentMember) {
      for (const match of normalizeMarkdownSyntax(markdownLine).matchAll(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g)) {
        currentMember.identifiers.push({ label: plainMarkdown(match[1]).trim(), href: match[2] });
      }
      continue;
    }

    const parsed = parseMemberLine(line);
    if (parsed) {
      commit();
      currentMember = {
        role: currentRole || "Член редакційної колегії",
        name: parsed.name,
        bio: parsed.bio,
        country: parsed.country,
        email: "",
        identifiers: [],
      };
      continue;
    }

    if (currentMember) {
      currentMember.bio = [currentMember.bio, line].filter(Boolean).join(" ");
    }
  }

  commit();
  return members;
}

function isEditorialRole(line: string) {
  return /^(Головний редактор|Заступник головного редактора|Член(?:и)? редакційної колегії|Editorial board members?|Editor-in-chief|Deputy editor)/i.test(line);
}

function isIdentifierLine(line: string) {
  return /^(ORCID|Scopus ID|ResearcherID)\b/i.test(line);
}

function parseMemberLine(line: string) {
  const match = line.match(/^([^,]+(?:\s+[^,]+){1,3}),\s*(.*)$/);
  if (!match) return null;

  const bio = match[2].trim();
  const country = bio.match(/,\s*([^,]+)$/)?.[1]?.trim() ?? "";
  return {
    name: match[1].trim(),
    bio: country ? bio.slice(0, bio.lastIndexOf(",")).trim() : bio,
    country,
  };
}

export function getStaticPage(path: string) {
  return pages[path];
}

export function CmsContent({ blocks }: { blocks: CmsBlock[] }) {
  const exampleStart = blocks.findIndex((block) => block.component.includes("design-example"));

  return (
    <section className="container mt-7">
      <Card className="prose-journal p-6">
        {blocks.map((block, index) => {
          const isExample = exampleStart >= 0 && index >= exampleStart;

          if (block.component.includes("design-example")) {
            return (
              <div key={`${block.component}-${index}`} className="cms-example-block my-6 flex flex-col justify-between gap-4 font-bold leading-relaxed sm:flex-row">
                <div className="shrink-0">{renderInlineMarkdown(block.UDK ?? "")}</div>
                <div className="text-right">{renderInlineMarkdown(block.personInfo ?? "")}</div>
              </div>
            );
          }

          if (block.component.includes("center-title")) {
            return <h2 key={`${block.component}-${index}`} className="cms-centered-title">{plainMarkdown(block.content ?? "")}</h2>;
          }

          if (block.component.includes("title")) {
            return <h2 key={`${block.component}-${index}`}>{plainMarkdown(block.content ?? "")}</h2>;
          }

          if (block.component.includes("list")) {
            return (
              <ul key={`${block.component}-${index}`} className={`${block.isShowListMarks ? "list-disc pl-6" : "list-none pl-0"}${isExample ? " cms-example-block" : ""}`}>
                {(block.items ?? []).filter(Boolean).map((item) => <li key={item} className="mb-2">{renderInlineMarkdown(item.replace(/^\s*[-*+]\s+/, ""))}</li>)}
              </ul>
            );
          }

          if (block.component.includes("button") && block.link) {
            return (
              <p key={`${block.component}-${index}`} className="pt-3">
                <a href={block.link} className="inline-flex rounded-md bg-accent px-5 py-3 font-semibold text-primary no-underline shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e4ad00] hover:shadow-md" target="_blank" rel="noreferrer">
                  {renderInlineMarkdown(block.content ?? "Оплатити")}
                </a>
              </p>
            );
          }

          return (
            <div key={`${block.component}-${index}`} className={`space-y-3${isExample ? " cms-example-block" : ""}`}>
              {normalizeMarkdownSyntax(block.content ?? "").split(/\n{2,}/).filter(Boolean).map((paragraph) => {
                if (/^\s*(?:[-*_]\s*){3,}\s*$/.test(paragraph)) return null;
                const isPublicationExemption = /^Виключення є лише для статей здобувачів третього рівня/.test(plainMarkdown(paragraph).trim());
                const content = renderInlineMarkdown(paragraph.replace(/(?<!\[)Creative Commons Attribution(?: BY)?(?: 4\.0 International)?(?: \(CC BY 4\.0\))?(?![^\[]*\]\()/g, (label) => `[${label}](https://creativecommons.org/licenses/by/4.0/)`));

                return (
                  <p key={paragraph} className={/^\s/.test(paragraph) ? "indent-8 text-justify" : undefined}>
                    {isPublicationExemption ? <strong>{content}</strong> : content}
                  </p>
                );
              })}
            </div>
          );
        })}
      </Card>
    </section>
  );
}
