import type { Lang } from "@/lib/types";

// Interface strings for both locales. CMS content arrives already localized;
// everything rendered by the frontend itself lives here.
const uk = {
  meta: {
    title: "Європейський правничий часопис",
    description: "Науковий журнал Європейського університету",
  },
  journal: {
    name: "Європейський правничий часопис",
    copyrights: "© Європейський правничий часопис",
    coverAlt: "Обкладинка Європейського правничого часопису",
  },
  university: {
    name: "Європейський університет",
    logoTop: "ЄВРОПЕЙСЬКИЙ",
    logoBottom: "УНІВЕРСИТЕТ",
  },
  common: {
    home: "Головна",
    breadcrumb: "Навігаційний ланцюжок",
    published: "Опубліковано",
    articles: "Статті",
    learnMore: "Детальніше",
    view: "Переглянути",
    pages: "Сторінки",
    pagesShort: "С.",
    article: "Стаття",
    page: "Сторінка",
    issue: "Випуск",
    select: "Оберіть",
  },
  badges: {
    category: "Категорія «Б»",
    cluster: "Кластер: Право",
  },
  hero: {
    eyebrow: "Науковий журнал",
    titleLines: ["Європейський", "правничий часопис"],
    subtitle: "European Legal Journal",
    listing: "Журнал включено до Переліку наукових фахових видань України (категорія «Б») відповідно до наказу МОН України від 11 червня 2026 року № 928 (Додаток 14) зі спеціальностей: D8 Право, D9 Міжнародне право.",
    submit: "Подати статтю",
    aboutTitle: "Про видання",
    facts: {
      publisher: ["Засновник та видавець", "ПВНЗ «Європейський університет»"],
      edrpou: ["Код за ЄДРПОУ видавця", "24366800"],
      founded: ["Рік заснування", "2023"],
      frequency: ["Періодичність", "У міру накопичення"],
      languages: ["Мови публікацій", "Українська, англійська"],
      doi: ["DOI prefix", "10.36919"],
      ror: ["ROR видавця", "https://ror.org/032s10s29"],
      media: ["Ідентифікатор медіа", "R30-01886"],
    },
  },
  homeCards: {
    currentIssue: "Поточний випуск",
    license: "Ліцензія",
    licenseBody: "Усі статті з 2026 року розповсюджуються на умовах ліцензії",
    indexing: "Індексація",
    rubrics: "Рубрики Журналу",
    rubricsBody: "Наукові напрями та рубрики журналу.",
  },
  purpose: {
    title: "Мета видання",
    body: "Мета видання - оприлюднення результатів наукових досліджень у галузі права шляхом висвітлення актуальних проблем юридичної науки та практики, а також сприяння вдосконаленню національного законодавства та правозастосовної діяльності. Журнал прагне інтегрувати українську правову думку в європейський та світовий науковий простір.",
    tasksTitle: "Завдання видання:",
  },
  header: {
    search: "Пошук по сайту",
    menu: "Меню",
    closeMenu: "Закрити меню",
    language: "Мова сайту",
  },
  archive: {
    title: "Архів випусків",
    description: "Ознайомтеся з архівними випусками «Європейського правничого часопису». Доступ до повних текстів статей відкрито для наукової спільноти та всіх зацікавлених читачів.",
    search: "Пошук у архіві",
    allYears: "Всі роки",
    sortNew: "Сортувати: спочатку нові",
    sortOld: "Сортувати: спочатку старі",
    found: "Знайдено випусків:",
    emptyTitle: "Нічого не знайдено",
    emptyBody: "Спробуйте змінити рік, сортування або пошуковий запит.",
    expand: "Розгорнути випуск",
    collapse: "Згорнути випуск",
    colTitle: "Назва",
    colAuthors: "Автори",
    colPages: "Сторінки",
    viewPdf: "Переглянути PDF",
  },
  currentIssue: {
    title: "Поточний випуск",
    description: "Найновіший випуск журналу з повними текстами статей та бібліографічними даними.",
    empty: "Статті для цього випуску ще не опубліковані в CMS. Сторінка зберігає структуру поточного випуску і автоматично покаже матеріали після додавання в архів або колекцію статей.",
  },
  editorialBoard: {
    title: "Редакційна колегія",
    composition: "Склад редколегії",
    profiles: "Окремі профілі учасників",
    total: "Загальна кількість членів",
    defaultRole: "Член редакційної колегії",
  },
  article: {
    originalLanguageNotice: "Англійський переклад цієї статті ще недоступний. Нижче наведено оригінал українською мовою.",
    fallbackDescription: "Наукова стаття Європейського правничого часопису.",
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
    citation: "Бібліографічні дані",
    identifiers: "Авторські ідентифікатори",
    backToTop: "До початку",
  },
  notFound: {
    title: "Сторінку не знайдено",
    body: "Адреса могла змінитися або матеріал ще не опубліковано.",
    home: "На головну",
  },
  cms: {
    pay: "Оплатити",
  },
};

export type Dictionary = typeof uk;

const en: Dictionary = {
  meta: {
    title: "European Legal Journal",
    description: "Scholarly journal of the European University",
  },
  journal: {
    name: "European Legal Journal",
    copyrights: "© European Legal Journal",
    coverAlt: "Cover of the European Legal Journal",
  },
  university: {
    name: "European University",
    logoTop: "EUROPEAN",
    logoBottom: "UNIVERSITY",
  },
  common: {
    home: "Home",
    breadcrumb: "Breadcrumb",
    published: "Published",
    articles: "Articles",
    learnMore: "Learn more",
    view: "View",
    pages: "Pages",
    pagesShort: "pp.",
    article: "Article",
    page: "Page",
    issue: "Issue",
    select: "Select",
  },
  badges: {
    category: "Category “B”",
    cluster: "Cluster: Law",
  },
  hero: {
    eyebrow: "Scholarly journal",
    titleLines: ["European", "Legal Journal"],
    subtitle: "",
    listing: "The journal is included in the List of scientific professional publications of Ukraine (category “B”) in accordance with the Order of the Ministry of Education and Science of Ukraine dated June 11, 2026 No. 928 (Appendix 14) in the following specialties: D8 Law, D9 International Law.",
    submit: "Submit an article",
    aboutTitle: "About the journal",
    facts: {
      publisher: ["Founder and publisher", "Private Higher Educational Establishment «European University»"],
      edrpou: ["EDRPOU code of the publisher", "24366800"],
      founded: ["Year of establishment", "2023"],
      frequency: ["Frequency of publication", "As articles become available"],
      languages: ["Languages of publication", "Ukrainian, English"],
      doi: ["DOI prefix", "10.36919"],
      ror: ["ROR of the publisher", "https://ror.org/032s10s29"],
      media: ["Media identifier", "R30-01886"],
    },
  },
  homeCards: {
    currentIssue: "Current issue",
    license: "License",
    licenseBody: "All articles published since 2026 are distributed under the terms of",
    indexing: "Indexing",
    rubrics: "Journal Sections",
    rubricsBody: "Research areas and sections of the journal.",
  },
  purpose: {
    title: "Aim of the journal",
    body: "The journal aims to publish research in law, addressing current issues in legal scholarship and practice and contributing to the improvement of national legislation and law enforcement. It also seeks to integrate Ukrainian legal scholarship into the European and global academic community.",
    tasksTitle: "Objectives of the journal:",
  },
  header: {
    search: "Search the site",
    menu: "Menu",
    closeMenu: "Close menu",
    language: "Site language",
  },
  archive: {
    title: "Issue archive",
    description: "Browse the archived issues of the «European Legal Journal». Full texts of the articles are openly available to the academic community and all interested readers.",
    search: "Search the archive",
    allYears: "All years",
    sortNew: "Sort: newest first",
    sortOld: "Sort: oldest first",
    found: "Issues found:",
    emptyTitle: "Nothing found",
    emptyBody: "Try changing the year, sorting or search query.",
    expand: "Expand issue",
    collapse: "Collapse issue",
    colTitle: "Title",
    colAuthors: "Authors",
    colPages: "Pages",
    viewPdf: "View PDF",
  },
  currentIssue: {
    title: "Current issue",
    description: "The latest issue of the journal with full texts of articles and bibliographic data.",
    empty: "Articles for this issue have not been published in the CMS yet. This page keeps the structure of the current issue and will show the materials automatically once they are added to the archive or the article collection.",
  },
  editorialBoard: {
    title: "Editorial board",
    composition: "Editorial board",
    profiles: "Individual member profiles",
    total: "Total number of members",
    defaultRole: "Editorial Board Member",
  },
  article: {
    originalLanguageNotice: "An English translation of this article is not yet available. The original Ukrainian text is shown below.",
    fallbackDescription: "A scholarly article of the European Legal Journal.",
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
    citation: "How to cite",
    identifiers: "Author identifiers",
    backToTop: "Back to top",
  },
  notFound: {
    title: "Page not found",
    body: "The address may have changed, or the material has not been published yet.",
    home: "Go to home page",
  },
  cms: {
    pay: "Pay",
  },
};

const dictionaries: Record<Lang, Dictionary> = { uk, en };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}

const dateLocales: Record<Lang, string> = { uk: "uk-UA", en: "en-GB" };

/** Formats ISO dates (YYYY-MM-DD…) for the locale; other values (e.g. a bare year) pass through. */
export function formatDate(lang: Lang, value?: string): string {
  if (!value) return "";
  if (!/^\d{4}-\d{2}-\d{2}/.test(value)) return value;
  const date = new Date(value.length === 10 ? `${value}T00:00:00Z` : value);
  if (Number.isNaN(date.getTime())) return value;
  // uk-UA appends " р." (рік) after the year; the journal style omits it.
  return new Intl.DateTimeFormat(dateLocales[lang], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(date).replace(/\s*р\.$/, "");
}
