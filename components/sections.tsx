import Link from "next/link";
import { Badge, ButtonLink, Card, LinkButton } from "@/components/ui";
import { Icon } from "@/components/icons";
import { JournalCover } from "@/components/cover";
import { ArchiveClient, IssueTable } from "@/components/archive-client";
import { editorialMembers, getLocalizedPath, pages } from "@/lib/data";
import type { Lang, Release, StaticPage } from "@/lib/types";

export function Hero({ lang, latest }: { lang: Lang; latest: Release }) {
  return (
    <section className="watermark border-b border-border py-10">
      <div className="container grid gap-8 lg:grid-cols-[1.1fr_360px_270px]">
        <div className="pt-4">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.32em] text-accent">Науковий журнал</div>
          <h1 className="journal-title text-5xl font-bold leading-tight text-primary md:text-6xl">Європейський<br />правничий часопис</h1>
          <p className="mt-3 text-xl font-semibold uppercase tracking-[0.16em] text-[#4a5365]">European Legal Journal</p>
          <p className="mt-5 max-w-xl leading-7 text-[#33435c]">Фахове рецензоване видання, що висвітлює актуальні проблеми права в Україні, Європі та світі. Платформа для наукового діалогу, обміну ідеями та розвитку правничої науки.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Badge><Icon name="building" className="h-4 w-4" />ISSN 3041-1149 (Print)</Badge>
            <Badge><Icon name="star" className="h-4 w-4 text-accent" />Категорія «Б» (Право)</Badge>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href={getLocalizedPath(lang, "/authors")}><Icon name="file" className="h-4 w-4" />Подати статтю</LinkButton>
            <LinkButton href={getLocalizedPath(lang, "/current-issue")} variant="outline"><Icon name="book" className="h-4 w-4" />Поточний випуск</LinkButton>
          </div>
        </div>
        <div className="justify-self-center"><JournalCover /></div>
        <Card className="h-fit p-5">
          <h2 className="mb-4 text-lg font-bold">Про видання</h2>
          {[
            ["building", "Засновник та видавець", "ПВНЗ «Європейський університет»"],
            ["calendar", "Рік заснування", "2023"],
            ["clock", "Періодичність", "У міру накопичення"],
            ["globe", "Мови публікацій", "Українська, англійська"],
            ["link", "DOI prefix", "10.36919"],
            ["file", "Останній випуск", latest.title],
          ].map(([icon, label, value]) => (
            <div key={label} className="flex gap-3 border-b border-border py-3 last:border-0">
              <Icon name={icon} className="mt-1 h-5 w-5 text-primary" />
              <div><div className="text-sm font-bold">{label}</div><div className="text-xs text-muted">{value}</div></div>
            </div>
          ))}
        </Card>
      </div>
    </section>
  );
}

export function HomeCards({ lang, latest }: { lang: Lang; latest: Release }) {
  const cards = [
    { title: "Останній випуск", href: "/current-issue", icon: "book", body: latest.description, cover: true },
    { title: "Для авторів", href: "/authors", icon: "file", body: "Вимоги до оформлення статей, процес рецензування, порядок подання." },
    { title: "Індексація", href: "/indexing", icon: "globe", body: "Google Scholar, Crossref, ORCID, ROAD, BASE." },
    { title: "Редакційна політика", href: "/publication-ethics", icon: "shield", body: "Етика публікацій, політика рецензування і відкритого доступу." },
  ];
  return (
    <section className="container mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="flex h-full flex-col p-6 transition hover:-translate-y-1 hover:shadow-lg">
          <div className="mb-4 flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-white"><Icon name={card.icon} className="h-6 w-6" /></span><h2 className="text-xl font-bold">{card.title}</h2></div>
          {card.cover && <div className="mb-3 flex gap-4"><JournalCover compact /><div><div className="font-bold">{latest.title}</div><div className="mt-1 text-xs text-muted">Опубліковано: {latest.publicationDate}</div></div></div>}
          <p className="min-h-14 text-sm leading-6 text-[#33435c]">{card.body}</p>
          <Link className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-primary" href={getLocalizedPath(lang, card.href)}>Детальніше <Icon name="arrow" className="h-4 w-4" /></Link>
        </Card>
      ))}
    </section>
  );
}

export function EditorMessage() {
  return (
    <section className="container mt-8">
      <Card className="grid gap-5 border-l-4 border-l-accent bg-white p-6 md:grid-cols-[auto_1fr] md:items-start">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-primary text-lg font-bold text-white">ЦП</div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Слово головного редактора</div>
          <h2 className="mt-2 text-2xl font-bold text-primary">Петро Цимбал</h2>
          <p className="mt-3 max-w-4xl text-base leading-7 text-[#33435c]">
            Європейський правничий часопис створено як відкритий простір для якісної правничої дискусії, академічної доброчесності та поширення результатів досліджень, що мають значення для України, Європи і міжнародної правової спільноти.
          </p>
        </div>
      </Card>
    </section>
  );
}

export function PageHero({ title, description }: { title: string; description: string }) {
  return (
    <section className="watermark border-b border-border py-9">
      <div className="container">
        <nav className="mb-3 flex flex-wrap items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
          <Link className="transition hover:text-primary hover:underline hover:underline-offset-4" href="/uk/">Головна</Link>
          <span>›</span>
          <span>{title}</span>
        </nav>
        <h1 className="journal-title text-5xl font-bold text-primary">{title}</h1>
        <p className="mt-3 max-w-2xl leading-6 text-[#33435c]">{description}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Badge><Icon name="building" className="h-4 w-4" />ISSN 3041-1149 (Print)</Badge>
          <Badge><Icon name="star" className="h-4 w-4 text-accent" />Категорія «Б» (Право)</Badge>
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
      <div><h3 className="text-lg font-bold leading-tight">{release.title}</h3><div className="text-sm text-muted">Опубліковано: {release.publicationDate}</div><div className="text-sm text-muted">Статті: {release.articles.length}</div></div>
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
        {page.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.body.map((text) => <p key={text}>{text}</p>)}</section>)}
      </Card>
    </section>
  );
}

export function EditorialBoard() {
  const countryCounts = editorialMembers.reduce<Record<string, number>>((counts, [, , country]) => {
    counts[country] = (counts[country] ?? 0) + 1;
    return counts;
  }, {});

  return (
    <section className="container mt-7 grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start">
      <div className="grid gap-4 sm:grid-cols-2">
        {editorialMembers.map(([name, role, country, id, email], index) => (
          <Card key={name} className="flex min-h-[210px] flex-col p-5">
            <div className="flex items-start gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-md bg-primary text-lg font-bold text-white">
                {getInitials(name)}
              </div>
              <div className="min-w-0">
                <div className={index < 2 ? "mb-2 inline-flex rounded bg-accent px-2.5 py-1 text-xs font-bold text-primary" : "mb-2 inline-flex rounded bg-accent-soft px-2.5 py-1 text-xs font-bold text-primary"}>
                  {role}
                </div>
                <h3 className="text-lg font-bold leading-snug text-primary">{name}</h3>
              </div>
            </div>
            <div className="mt-5 grid gap-3 border-t border-border pt-4 text-sm">
              <div className="flex items-start gap-3">
                <Icon name="building" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="leading-6 text-[#33435c]">ПВНЗ «Європейський університет»</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="globe" className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-[#33435c]">{country}</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="link" className="h-4 w-4 shrink-0 text-primary" />
                <span className="inline-flex rounded border border-[#dfe8c5] px-2 py-1 text-xs font-semibold text-[#5d7b16]">{id}</span>
              </div>
              {email && (
                <a className="flex items-center gap-3 text-primary underline-offset-4 hover:underline" href={`mailto:${email}`}>
                  <Icon name="mail" className="h-4 w-4 shrink-0" />
                  <span className="break-all">{email}</span>
                </a>
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
            <p className="text-sm text-muted">Міжнародна наукова команда</p>
          </div>
        </div>
        <div className="mt-5 rounded-md bg-[#f4f7fb] p-4 text-center">
          <div className="text-sm text-muted">Загальна кількість членів</div>
          <b className="mt-1 block text-4xl text-primary">{editorialMembers.length}</b>
        </div>
        <div className="mt-5 space-y-3 text-sm">
          {Object.entries(countryCounts).map(([country, count]) => (
            <div key={country} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
              <span className="text-[#33435c]">{country}</span>
              <b className="text-primary">{count}</b>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

export function CmsEditorialBoard({ blocks }: { blocks: { component: string; content?: string; items?: string[] }[] }) {
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
                  <Icon name="globe" className="h-4 w-4 shrink-0 text-primary" />
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
                    <span key={identifier} className="inline-flex rounded border border-[#dfe8c5] px-2 py-1 text-xs font-semibold text-[#5d7b16]">
                      {identifier}
                    </span>
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
              <span className="text-[#33435c]">{country}</span>
              <b className="text-primary">{count}</b>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
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
  identifiers: string[];
};

function parseEditorialMembers(blocks: { content?: string; items?: string[] }[]): EditorialMemberCard[] {
  const lines = blocks
    .flatMap((block) => [block.content, ...(block.items ?? [])])
    .filter((value): value is string => Boolean(value))
    .flatMap((value) => decodeHtmlEntities(value).replaceAll("\\n", "\n").split(/\n+/))
    .map((line) => plainMarkdown(line).trim())
    .filter(Boolean);

  const members: EditorialMemberCard[] = [];
  let currentRole = "";
  let currentMember: EditorialMemberCard | null = null;

  const commit = () => {
    if (currentMember?.name) members.push(currentMember);
    currentMember = null;
  };

  for (const line of lines) {
    if (isEditorialRole(line)) {
      commit();
      currentRole = line;
      continue;
    }

    const email = line.match(/email:\s*([^\s,;]+)/i);
    if (email && currentMember) {
      currentMember.email = email[1];
      continue;
    }

    if (isIdentifierLine(line) && currentMember) {
      currentMember.identifiers.push(line);
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
  return /^(Головний редактор|Заступник головного редактора|Члени редакційної колегії|Editorial board members|Editor-in-chief|Deputy editor)/i.test(line);
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
    bio,
    country,
  };
}

export function getStaticPage(path: string) {
  return pages[path];
}

export function CmsContent({ blocks }: { blocks: { component: string; content?: string; items?: string[]; isShowListMarks?: boolean; link?: string }[] }) {
  return (
    <section className="container mt-7">
      <Card className="prose-journal p-6">
        {blocks.map((block, index) => {
          if (block.component.includes("title")) {
            return <h2 key={`${block.component}-${index}`}>{plainMarkdown(block.content ?? "")}</h2>;
          }

          if (block.component.includes("list")) {
            return (
              <ul key={`${block.component}-${index}`} className={block.isShowListMarks ? "list-disc pl-6" : "list-none pl-0"}>
                {(block.items ?? []).filter(Boolean).map((item) => <li key={item} className="mb-2">{renderInlineMarkdown(item)}</li>)}
              </ul>
            );
          }

          if (block.component.includes("button") && block.link) {
            return (
              <p key={`${block.component}-${index}`} className="pt-3">
                <a href={block.link} className="inline-flex rounded-md bg-accent px-5 py-3 font-semibold text-primary no-underline shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e4ad00] hover:shadow-md" target="_blank" rel="noreferrer">
                  {block.content ?? "Оплатити"}
                </a>
              </p>
            );
          }

          return (
            <div key={`${block.component}-${index}`} className="space-y-3">
              {normalizeMarkdownSyntax(block.content ?? "").split(/\n{2,}/).filter(Boolean).map((paragraph) => (
                <p key={paragraph}>{renderInlineMarkdown(paragraph)}</p>
              ))}
            </div>
          );
        })}
      </Card>
    </section>
  );
}

function plainMarkdown(value: string) {
  return normalizeMarkdownSyntax(value)
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/\[([\s\S]*?)\]\(([\s\S]*?)\)/g, "$1")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/\\\[/g, "[")
    .replace(/\\\]/g, "]");
}

function renderInlineMarkdown(value: string) {
  const cleanValue = normalizeMarkdownSyntax(value);
  const parts = splitInlineMarkdown(cleanValue);

  return parts.map((part, index) => {
    if (part === "\n") return <br key={`${part}-${index}`} />;

    const boldLink = part.match(/^(?:\*\*|__)\[([\s\S]*)\]\(([\s\S]*?)\)(?:\*\*|__)$/);
    if (boldLink) {
      return (
        <a key={`${part}-${index}`} href={boldLink[2]} className="font-semibold text-primary underline underline-offset-2" target={boldLink[2].startsWith("http") ? "_blank" : undefined} rel={boldLink[2].startsWith("http") ? "noreferrer" : undefined}>
          <strong>{renderInlineMarkdown(boldLink[1])}</strong>
        </a>
      );
    }

    const link = part.match(/^\[([\s\S]*)\]\(([\s\S]*?)\)$/);
    if (link) {
      return (
        <a key={`${part}-${index}`} href={link[2]} className={link[1].toLowerCase().includes("оплат") ? "inline-flex rounded-md bg-accent px-4 py-2 font-semibold text-primary no-underline shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e4ad00] hover:shadow-md" : "font-semibold text-primary underline underline-offset-2"} target={link[2].startsWith("http") ? "_blank" : undefined} rel={link[2].startsWith("http") ? "noreferrer" : undefined}>
          {renderInlineMarkdown(link[1])}
        </a>
      );
    }

    const bold = part.match(/^(?:\*\*|__)([\s\S]*?)(?:\*\*|__)$/);
    if (bold) return <strong key={`${part}-${index}`}>{renderInlineMarkdown(bold[1])}</strong>;

    return <span key={`${part}-${index}`}>{plainMarkdown(part)}</span>;
  });
}

function normalizeMarkdownSyntax(value: string) {
  return decodeHtmlEntities(value)
    .replaceAll("\\n", "\n")
    .replace(/\\([\[\]()])/g, "$1")
    .replace(/\]\s+\(/g, "](");
}

function splitInlineMarkdown(value: string) {
  const parts: string[] = [];
  let index = 0;

  while (index < value.length) {
    const nextLink = value.indexOf("](", index);
    if (nextLink === -1) break;

    let labelStart = nextLink - 1;
    while (labelStart >= index && value[labelStart] !== "[") labelStart -= 1;
    if (labelStart < index) {
      index = nextLink + 2;
      continue;
    }

    const hrefEnd = value.indexOf(")", nextLink + 2);
    if (hrefEnd === -1) break;

    const isBoldWrapped = value.slice(labelStart - 2, labelStart) === "**" && value.slice(hrefEnd + 1, hrefEnd + 3) === "**";
    const isStrongWrapped = value.slice(labelStart - 2, labelStart) === "__" && value.slice(hrefEnd + 1, hrefEnd + 3) === "__";
    const tokenStart = isBoldWrapped || isStrongWrapped ? labelStart - 2 : labelStart;
    const tokenEnd = isBoldWrapped || isStrongWrapped ? hrefEnd + 3 : hrefEnd + 1;

    if (tokenStart > index) parts.push(...splitTextMarkdown(value.slice(index, tokenStart)));
    parts.push(value.slice(tokenStart, tokenEnd));
    index = tokenEnd;
  }

  if (index < value.length) parts.push(...splitTextMarkdown(value.slice(index)));
  return parts.filter(Boolean);
}

function splitTextMarkdown(value: string) {
  return value.split(/(\*\*[\s\S]*?\*\*|__[\s\S]*?__|\n)/g).filter(Boolean);
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, decimal: string) => String.fromCodePoint(parseInt(decimal, 10)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}
