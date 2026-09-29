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

export const editorialMembers = [
  ["Цимбал Петро Васильович", "Головний редактор", "Україна", "ORCID", "p.tsymbal@e-u.edu.ua"],
  ["Тимошенко Ольга Анатоліївна", "Заступник головного редактора", "Україна", "Scopus ID", "olga.tymoshenko@e-u.edu.ua"],
  ["Антошкіна Валерія Костянтинівна", "Член редколегії", "Україна", "ORCID", ""],
  ["Kravchuk Petro Yuriiovych", "Член редколегії", "Україна", "Scopus ID", ""],
  ["Basysta Iryna Volodymyrivna", "Член редколегії", "Україна", "ORCID", ""],
  ["Blachnio-Parzych Anna", "Член редколегії", "Польща", "ResearcherID", ""],
  ["Carlson Laura", "Член редколегії", "Швеція", "ORCID", ""],
  ["Ondrej Málek", "Член редколегії", "Чехія", "ResearcherID", ""],
];

export const pages: Record<string, StaticPage> = {
  "/authors": { title: "Для авторів", description: "Вимоги до оформлення, рецензування та подання матеріалів.", path: "/authors", sections: [{ heading: "Вимоги до оформлення статей", body: ["Матеріали подаються українською або англійською мовою з анотаціями, ключовими словами та списком використаних джерел.", "Обсяг, структура та бібліографія мають відповідати чинним редакційним вимогам журналу."] }, { heading: "Процес рецензування", body: ["Усі наукові статті проходять попередню перевірку редакцією та незалежне рецензування.", "Редакція повідомляє автора про рішення і за потреби надсилає рекомендації щодо доопрацювання."] }] },
  "/publication-ethics": { title: "Етика публікацій", description: "Редакційна політика, рецензування, відкритий доступ і запобігання плагіату.", path: "/publication-ethics", sections: [{ heading: "Етичні принципи", body: ["Журнал дотримується принципів академічної доброчесності, прозорості редакційних процедур і поваги до авторських прав."] }, { heading: "Політика щодо плагіату", body: ["Матеріали перевіряються на ознаки текстових запозичень. Рукописи з недоброчесними практиками не допускаються до публікації."] }] },
  "/indexing": { title: "Індексація", description: "Журнал індексується та представлений у наукометричних і довідкових базах.", path: "/indexing", sections: [{ heading: "Бази даних", body: ["Google Scholar, Crossref, ORCID, ROAD, BASE та інші академічні сервіси використовуються для поширення ідентифікованого контенту журналу."] }] },
  "/contacts": { title: "Контакти", description: "Редакція Європейського правничого часопису.", path: "/contacts", sections: [{ heading: "Редакція", body: ["Email: legal.journal@e-u.edu.ua", "ПВНЗ «Європейський університет», Україна."] }] },
};

export function getLocalizedPath(lang: Lang, href: string) {
  return `/${lang}${href === "/" ? "/" : href}`;
}

export function getAllArticles(releases: Release[] = fallbackReleases): Article[] {
  return releases.flatMap((release) => release.articles.map((article) => ({ ...article, publishedAt: release.publicationDate })));
}
