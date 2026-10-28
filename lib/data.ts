import type { Article, Lang, Release, StaticPage } from "@/lib/types";

export const languages: Lang[] = ["uk", "en"];

export const navItems = [
  { label: { uk: "Головна", en: "Home" }, href: "/" },
  { label: { uk: "Поточний випуск", en: "Current issue" }, href: "/current-issue" },
  { label: { uk: "Архів", en: "Archive" }, href: "/archive" },
  { label: { uk: "Для авторів", en: "For authors" }, href: "/authors" },
  { label: { uk: "Редколегія", en: "Editorial board" }, href: "/editorial-board" },
  { label: { uk: "Етика публікацій", en: "Publication ethics" }, href: "/publication-ethics" },
  { label: { uk: "Індексація", en: "Indexing" }, href: "/indexing" },
  { label: { uk: "Контакти", en: "Contacts" }, href: "/contacts" },
];

export const fallbackReleases: Release[] = [
  { title: "№ 1 (2026)", issueNumber: "1", year: "2026", publicationDate: "15 травня 2026", description: "Актуальні дослідження у сфері права та правозастосування в Україні, Європі та світі.", articles: [] },
  {
    title: "№ 2 (2025)",
    issueNumber: "2",
    year: "2025",
    publicationDate: "20 жовтня 2025",
    description: "Актуальні дослідження у сфері права та правозастосування в Україні, Європі та світі.",
    articles: [{ title: "Правові стандарти академічної доброчесності в європейському просторі", slug: "academic-integrity-legal-standards", authors: "Цимбал П. В., Тимошенко О. А.", pages: "7-18", doi: "10.36919/elj.2025.2.01", abstract: "Стаття аналізує сучасні підходи до академічної доброчесності та правові механізми її забезпечення.", keywords: "академічна доброчесність; право; університет; Європа" }],
  },
  {
    title: "№ 1 (2025)",
    issueNumber: "1",
    year: "2025",
    publicationDate: "15 травня 2025",
    description: "Актуальні дослідження у сфері права та правозастосування в Україні, Європі та світі.",
    articles: [{ title: "Цифровізація правосуддя: виклики для національної судової системи", slug: "digital-justice-national-courts", authors: "Антошкіна В. К.", pages: "19-31", doi: "10.36919/elj.2025.1.02", abstract: "Досліджено процеси цифровізації судочинства та баланс між доступністю правосуддя і захистом даних.", keywords: "правосуддя; цифровізація; суд; персональні дані" }],
  },
  {
    title: "№ 1 (2024)",
    issueNumber: "1",
    year: "2024",
    publicationDate: "15 травня 2024",
    description: "Актуальні дослідження у сфері права та правозастосування.",
    articles: [{ title: "Верховенство права як орієнтир європейської інтеграції України", slug: "rule-of-law-european-integration", authors: "Кравчук П. Ю.", pages: "32-44", doi: "10.36919/elj.2024.1.03", abstract: "Розкрито значення принципу верховенства права у процесі адаптації законодавства України до стандартів ЄС.", keywords: "верховенство права; євроінтеграція; Україна; ЄС" }],
  },
  {
    title: "№ 1 (2023)",
    issueNumber: "1",
    year: "2023",
    publicationDate: "15 травня 2023",
    description: "Перший випуск наукового журналу Європейського університету.",
    articles: [{ title: "Гармонізація приватного права України з правом Європейського Союзу", slug: "private-law-harmonization-eu", authors: "Басиста І. В.", pages: "45-58", doi: "10.36919/elj.2023.1.04", abstract: "У статті розглянуто ключові напрями гармонізації приватноправового регулювання.", keywords: "приватне право; гармонізація; Європейський Союз" }],
  },
];

export const indexingServices = [
  { label: "Наукова періодика України", detailLabel: "Наукова періодика України (Національна бібліотека України імені В.І. Вернадського)", href: "http://www.irbis-nbuv.gov.ua/cgi-bin/irbis_nbuv/cgiirbis_64.exe?Z21ID=&I21DBN=UJRN&P21DBN=UJRN&S21STN=1&S21REF=10&S21FMT=juu_all&C21COM=S&S21CNR=20&S21P01=0&S21P02=0&S21P03=PREF=&S21COLORTERMS=0&S21STR=elj" },
  { label: "Google Scholar", href: "https://scholar.google.com.ua/scholar?as_publication=Європейський+правничий+часопис&hl=uk" },
  { label: "CrossRef", href: "https://www.crossref.org/" },
  { label: "Інституційний репозиторій ПВНЗ «Європейський університет»", href: "http://dspace.e-u.edu.ua/handle/123456789/28" },
];

export const journalRubrics = [
  "Теорія та історія держави і права",
  "Конституційне право",
  "Цивільне право і процес",
  "Адміністративне право і процес",
  "Міжнародне право",
  "Право Європейського Союзу",
  "Сімейне право",
  "Екологічне право",
  "Кримінологія",
  "Кримінальне та кримінальне процесуальне право",
  "Інші галузі права",
];

export const journalTasks = [
  "створення відкритого майданчика для обміну ідеями між досвідченими науковцями, практиками, викладачами, аспірантами та студентами;",
  "забезпечення якісного рецензування та публікації оригінальних наукових статей, що містять новизну та обґрунтовані висновки;",
  "дослідження широкого спектру юридичних напрямів;",
  "дотримання принципів академічної доброчесності, професійної етики та високої якості наукового контенту;",
  "поширення актуальної інформації про нові законодавчі ініціативи, судову практику та сучасні тенденції юриспруденції в Україні та світі.",
];

export const pages: Record<string, StaticPage> = {
  "/authors": { title: "Для авторів", description: "Вимоги до оформлення, рецензування та подання матеріалів.", path: "/authors", sections: [{ heading: "Вимоги до оформлення статей", body: ["Матеріали подаються українською або англійською мовою з анотаціями, ключовими словами та списком використаних джерел.", "Обсяг, структура та бібліографія мають відповідати чинним редакційним вимогам журналу."] }, { heading: "Процес рецензування", body: ["Усі наукові статті проходять попередню перевірку редакцією та незалежне рецензування.", "Редакція повідомляє автора про рішення і за потреби надсилає рекомендації щодо доопрацювання."] }] },
  "/publication-ethics": { title: "Етика публікацій", description: "Редакційна політика, рецензування, відкритий доступ і запобігання плагіату.", path: "/publication-ethics", sections: [{ heading: "Етичні принципи", body: ["Журнал дотримується принципів академічної доброчесності, прозорості редакційних процедур і поваги до авторських прав."] }, { heading: "Політика щодо плагіату", body: ["Матеріали перевіряються на ознаки текстових запозичень. Рукописи з недоброчесними практиками не допускаються до публікації."] }] },
  "/indexing": { title: "Індексація", description: "", path: "/indexing", sections: [{ heading: "Індексація в наукометричних базах даних:", body: indexingServices.map(({ label, detailLabel, href }) => `[${detailLabel ?? label}](${href})`), list: true }] },
  "/journal-rubrics": { title: "Рубрики журналу", description: "", path: "/journal-rubrics", sections: [{ heading: "Рубрики журналу", body: journalRubrics, list: true }] },
  "/open-access": { title: "Політика відкритого доступу та тип ліцензування на використання обʼєктів авторського права", description: "", path: "/open-access", sections: [{ heading: "Відкритий доступ і ліцензування", body: ["Усі статті з 2026 року розповсюджуються на умовах ліцензії [Creative Commons Attribution BY 4.0 (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)."] }] },
  "/publication-requirements": { title: "Вимоги до публікацій", description: "", path: "/publication-requirements", sections: [{ heading: "Вимоги до оформлення статей", body: ["Матеріали подаються українською або англійською мовою з анотаціями, ключовими словами та списком використаних джерел.", "Обсяг, структура та бібліографія мають відповідати чинним редакційним вимогам журналу."] }, { heading: "Процес рецензування", body: ["Усі наукові статті проходять попередню перевірку редакцією та незалежне рецензування.", "Редакція повідомляє автора про рішення і за потреби надсилає рекомендації щодо доопрацювання."] }] },
  "/contacts": { title: "Контакти", description: "Редакція Європейського правничого часопису.", path: "/contacts", sections: [{ heading: "Редакція", body: ["Email: legal.journal@e-u.edu.ua", "ПВНЗ «Європейський університет», Україна."] }] },
};

export function getLocalizedPath(lang: Lang, href: string) {
  return `/${lang}${href === "/" ? "/" : href}`;
}

export function getAllArticles(releases: Release[] = fallbackReleases): Article[] {
  return releases.flatMap((release) => release.articles.map((article) => ({ ...article, publishedAt: release.publicationDate })));
}

export function getArticleCount(release: Release): number {
  // Keep front matter available in the issue, but exclude it from the article count.
  return release.articles.filter((article) => !/^(титул|титулка|титульна сторінка|зміст|contents|table of contents|title page|cover)$/i.test(
    article.title.trim().replace(/^с(?=ontents$)/i, "c"),
  )).length;
}
