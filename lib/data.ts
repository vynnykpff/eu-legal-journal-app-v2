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

const ukFallbackReleases: Release[] = [
  { title: "№ 1 (2026)", issueNumber: "1", year: "2026", publicationDate: "2026-05-15", description: "Актуальні дослідження у сфері права та правозастосування в Україні, Європі та світі.", articles: [] },
  {
    title: "№ 2 (2025)",
    issueNumber: "2",
    year: "2025",
    publicationDate: "2025-10-20",
    description: "Актуальні дослідження у сфері права та правозастосування в Україні, Європі та світі.",
    articles: [{ title: "Правові стандарти академічної доброчесності в європейському просторі", slug: "academic-integrity-legal-standards", authors: "Цимбал П. В., Тимошенко О. А.", pages: "7-18", doi: "10.36919/elj.2025.2.01", abstract: "Стаття аналізує сучасні підходи до академічної доброчесності та правові механізми її забезпечення.", keywords: "академічна доброчесність; право; університет; Європа" }],
  },
  {
    title: "№ 1 (2025)",
    issueNumber: "1",
    year: "2025",
    publicationDate: "2025-05-15",
    description: "Актуальні дослідження у сфері права та правозастосування в Україні, Європі та світі.",
    articles: [{ title: "Цифровізація правосуддя: виклики для національної судової системи", slug: "digital-justice-national-courts", authors: "Антошкіна В. К.", pages: "19-31", doi: "10.36919/elj.2025.1.02", abstract: "Досліджено процеси цифровізації судочинства та баланс між доступністю правосуддя і захистом даних.", keywords: "правосуддя; цифровізація; суд; персональні дані" }],
  },
  {
    title: "№ 1 (2024)",
    issueNumber: "1",
    year: "2024",
    publicationDate: "2024-05-15",
    description: "Актуальні дослідження у сфері права та правозастосування.",
    articles: [{ title: "Верховенство права як орієнтир європейської інтеграції України", slug: "rule-of-law-european-integration", authors: "Кравчук П. Ю.", pages: "32-44", doi: "10.36919/elj.2024.1.03", abstract: "Розкрито значення принципу верховенства права у процесі адаптації законодавства України до стандартів ЄС.", keywords: "верховенство права; євроінтеграція; Україна; ЄС" }],
  },
  {
    title: "№ 1 (2023)",
    issueNumber: "1",
    year: "2023",
    publicationDate: "2023-05-15",
    description: "Перший випуск наукового журналу Європейського університету.",
    articles: [{ title: "Гармонізація приватного права України з правом Європейського Союзу", slug: "private-law-harmonization-eu", authors: "Басиста І. В.", pages: "45-58", doi: "10.36919/elj.2023.1.04", abstract: "У статті розглянуто ключові напрями гармонізації приватноправового регулювання.", keywords: "приватне право; гармонізація; Європейський Союз" }],
  },
];

const enFallbackReleases: Release[] = [
  { title: "No. 1 (2026)", issueNumber: "1", year: "2026", publicationDate: "2026-05-15", description: "Current research in law and law enforcement in Ukraine, Europe and the world.", articles: [] },
  {
    title: "No. 2 (2025)",
    issueNumber: "2",
    year: "2025",
    publicationDate: "2025-10-20",
    description: "Current research in law and law enforcement in Ukraine, Europe and the world.",
    articles: [{ title: "Legal Standards of Academic Integrity in the European Area", slug: "academic-integrity-legal-standards", authors: "Tsymbal P. V., Tymoshenko O. A.", pages: "7-18", doi: "10.36919/elj.2025.2.01", abstract: "The article analyses current approaches to academic integrity and the legal mechanisms for ensuring it.", keywords: "academic integrity; law; university; Europe" }],
  },
  {
    title: "No. 1 (2025)",
    issueNumber: "1",
    year: "2025",
    publicationDate: "2025-05-15",
    description: "Current research in law and law enforcement in Ukraine, Europe and the world.",
    articles: [{ title: "Digitalisation of Justice: Challenges for the National Judicial System", slug: "digital-justice-national-courts", authors: "Antoshkina V. K.", pages: "19-31", doi: "10.36919/elj.2025.1.02", abstract: "The study examines the digitalisation of court proceedings and the balance between access to justice and data protection.", keywords: "justice; digitalisation; court; personal data" }],
  },
  {
    title: "No. 1 (2024)",
    issueNumber: "1",
    year: "2024",
    publicationDate: "2024-05-15",
    description: "Current research in law and law enforcement.",
    articles: [{ title: "The Rule of Law as a Guideline for Ukraine's European Integration", slug: "rule-of-law-european-integration", authors: "Kravchuk P. Yu.", pages: "32-44", doi: "10.36919/elj.2024.1.03", abstract: "The article reveals the significance of the rule of law in adapting Ukrainian legislation to EU standards.", keywords: "rule of law; European integration; Ukraine; EU" }],
  },
  {
    title: "No. 1 (2023)",
    issueNumber: "1",
    year: "2023",
    publicationDate: "2023-05-15",
    description: "The first issue of the scholarly journal of the European University.",
    articles: [{ title: "Harmonisation of Ukrainian Private Law with European Union Law", slug: "private-law-harmonization-eu", authors: "Basysta I. V.", pages: "45-58", doi: "10.36919/elj.2023.1.04", abstract: "The article considers the key directions of harmonising private law regulation.", keywords: "private law; harmonisation; European Union" }],
  },
];

export const fallbackReleases: Record<Lang, Release[]> = { uk: ukFallbackReleases, en: enFallbackReleases };

type IndexingService = { label: string; detailLabel?: string; href: string };

export const indexingServices: Record<Lang, IndexingService[]> = {
  uk: [
    { label: "Наукова періодика України", detailLabel: "Наукова періодика України (Національна бібліотека України імені В.І. Вернадського)", href: "http://www.irbis-nbuv.gov.ua/cgi-bin/irbis_nbuv/cgiirbis_64.exe?Z21ID=&I21DBN=UJRN&P21DBN=UJRN&S21STN=1&S21REF=10&S21FMT=juu_all&C21COM=S&S21CNR=20&S21P01=0&S21P02=0&S21P03=PREF=&S21COLORTERMS=0&S21STR=elj" },
    { label: "Google Scholar", href: "https://scholar.google.com.ua/scholar?as_publication=Європейський+правничий+часопис&hl=uk" },
    { label: "CrossRef", href: "https://www.crossref.org/" },
    { label: "Інституційний репозиторій ПВНЗ «Європейський університет»", href: "http://dspace.e-u.edu.ua/handle/123456789/28" },
  ],
  en: [
    { label: "Scientific Periodicals of Ukraine", detailLabel: "Scientific Periodicals of Ukraine (Vernadsky National Library of Ukraine)", href: "http://www.irbis-nbuv.gov.ua/cgi-bin/irbis_nbuv/cgiirbis_64.exe?Z21ID=&I21DBN=UJRN&P21DBN=UJRN&S21STN=1&S21REF=10&S21FMT=juu_all&C21COM=S&S21CNR=20&S21P01=0&S21P02=0&S21P03=PREF=&S21COLORTERMS=0&S21STR=elj" },
    { label: "Google Scholar", href: "https://scholar.google.com.ua/scholar?as_publication=Європейський+правничий+часопис&hl=en" },
    { label: "CrossRef", href: "https://www.crossref.org/" },
    { label: "Institutional repository of the PHEE «European University»", href: "http://dspace.e-u.edu.ua/handle/123456789/28" },
  ],
};

export const journalRubrics: Record<Lang, string[]> = {
  uk: [
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
  ],
  en: [
    "Theory and History of State and Law",
    "Constitutional Law",
    "Civil Law and Procedure",
    "Administrative Law and Procedure",
    "International Law",
    "Law of the European Union",
    "Family Law",
    "Environmental Law",
    "Criminology",
    "Criminal and Criminal Procedure Law",
    "Other Branches of Law",
  ],
};

export const journalTasks: Record<Lang, string[]> = {
  uk: [
    "створення відкритого майданчика для обміну ідеями між досвідченими науковцями, практиками, викладачами, аспірантами та студентами;",
    "забезпечення якісного рецензування та публікації оригінальних наукових статей, що містять новизну та обґрунтовані висновки;",
    "дослідження широкого спектру юридичних напрямів;",
    "дотримання принципів академічної доброчесності, професійної етики та високої якості наукового контенту;",
    "поширення актуальної інформації про нові законодавчі ініціативи, судову практику та сучасні тенденції юриспруденції в Україні та світі.",
  ],
  en: [
    "creation of an open platform for the exchange of ideas between experienced scientists, practitioners, lecturers, postgraduate students and students;",
    "ensuring high-quality peer review and publication of original scientific articles that contain novelty and well-founded conclusions;",
    "research of a wide range of legal fields;",
    "adherence to the principles of academic integrity, professional ethics and high quality of scientific content;",
    "dissemination of up-to-date information on new legislative initiatives, judicial practice and current trends in jurisprudence in Ukraine and the world.",
  ],
};

const licenseUrl = "https://creativecommons.org/licenses/by/4.0/";

const submissionSections: Record<Lang, StaticPage["sections"]> = {
  uk: [
    { heading: "Вимоги до оформлення статей", body: ["Матеріали подаються українською або англійською мовою з анотаціями, ключовими словами та списком використаних джерел.", "Обсяг, структура та бібліографія мають відповідати чинним редакційним вимогам журналу."] },
    { heading: "Процес рецензування", body: ["Усі наукові статті проходять попередню перевірку редакцією та незалежне рецензування.", "Редакція повідомляє автора про рішення і за потреби надсилає рекомендації щодо доопрацювання."] },
  ],
  en: [
    { heading: "Article formatting requirements", body: ["Manuscripts are submitted in Ukrainian or English with abstracts, keywords and a list of references.", "The length, structure and bibliography must comply with the journal's current editorial requirements."] },
    { heading: "Peer review process", body: ["All scholarly articles undergo preliminary screening by the editorial office and independent peer review.", "The editorial office notifies the author of its decision and, where necessary, sends recommendations for revision."] },
  ],
};

const indexingBody = (lang: Lang) => indexingServices[lang].map(({ label, detailLabel, href }) => `[${detailLabel ?? label}](${href})`);

export const pages: Record<Lang, Record<string, StaticPage>> = {
  uk: {
    "/authors": { title: "Для авторів", description: "Вимоги до оформлення, рецензування та подання матеріалів.", path: "/authors", sections: submissionSections.uk },
    "/publication-ethics": { title: "Етика публікацій", description: "Редакційна політика, рецензування, відкритий доступ і запобігання плагіату.", path: "/publication-ethics", sections: [{ heading: "Етичні принципи", body: ["Журнал дотримується принципів академічної доброчесності, прозорості редакційних процедур і поваги до авторських прав."] }, { heading: "Політика щодо плагіату", body: ["Матеріали перевіряються на ознаки текстових запозичень. Рукописи з недоброчесними практиками не допускаються до публікації."] }] },
    "/indexing": { title: "Індексація", description: "", path: "/indexing", sections: [{ heading: "Індексація в наукометричних базах даних:", body: indexingBody("uk"), list: true }] },
    "/journal-rubrics": { title: "Рубрики журналу", description: "", path: "/journal-rubrics", sections: [{ heading: "Рубрики журналу", body: journalRubrics.uk, list: true }] },
    "/open-access": { title: "Політика відкритого доступу та тип ліцензування на використання обʼєктів авторського права", description: "", path: "/open-access", sections: [{ heading: "Відкритий доступ і ліцензування", body: [`Усі статті з 2026 року розповсюджуються на умовах ліцензії [Creative Commons Attribution BY 4.0 (CC BY 4.0)](${licenseUrl}).`] }] },
    "/publication-requirements": { title: "Вимоги до публікацій", description: "", path: "/publication-requirements", sections: submissionSections.uk },
    "/contacts": { title: "Контакти", description: "Редакція Європейського правничого часопису.", path: "/contacts", sections: [{ heading: "Редакція", body: ["Email: legal.journal@e-u.edu.ua", "ПВНЗ «Європейський університет», Україна."] }] },
  },
  en: {
    "/authors": { title: "For authors", description: "Formatting requirements, peer review and submission of manuscripts.", path: "/authors", sections: submissionSections.en },
    "/publication-ethics": { title: "Publication ethics", description: "Editorial policy, peer review, open access and plagiarism prevention.", path: "/publication-ethics", sections: [{ heading: "Ethical principles", body: ["The journal adheres to the principles of academic integrity, transparency of editorial procedures and respect for copyright."] }, { heading: "Plagiarism policy", body: ["Manuscripts are checked for signs of textual borrowing. Manuscripts involving dishonest practices are not accepted for publication."] }] },
    "/indexing": { title: "Indexing", description: "", path: "/indexing", sections: [{ heading: "Indexing in scientometric databases:", body: indexingBody("en"), list: true }] },
    "/journal-rubrics": { title: "Journal Sections", description: "", path: "/journal-rubrics", sections: [{ heading: "Journal Sections", body: journalRubrics.en, list: true }] },
    "/open-access": { title: "Open Access Policy and Types of Licensing for the Use of Copyrighted Materials", description: "", path: "/open-access", sections: [{ heading: "Open access and licensing", body: [`All articles published since 2026 are distributed under the [Creative Commons Attribution BY 4.0 (CC BY 4.0)](${licenseUrl}) license.`] }] },
    "/publication-requirements": { title: "Requirements for publications", description: "", path: "/publication-requirements", sections: submissionSections.en },
    "/contacts": { title: "Contacts", description: "Editorial office of the European Legal Journal.", path: "/contacts", sections: [{ heading: "Editorial office", body: ["Email: legal.journal@e-u.edu.ua", "Private Higher Educational Establishment «European University», Ukraine."] }] },
  },
};

export function getLocalizedPath(lang: Lang, href: string) {
  return `/${lang}${href === "/" ? "/" : href}`;
}

export function getAllArticles(releases: Release[]): Article[] {
  return releases.flatMap((release) => release.articles.map((article) => ({ ...article, publishedAt: release.publicationDate })));
}

export function getArticleCount(release: Release): number {
  // Keep front matter available in the issue, but exclude it from the article count.
  return release.articles.filter((article) => !/^(титул|титулка|титульна сторінка|зміст|contents|table of contents|title page|cover)$/i.test(
    article.title.trim().replace(/^с(?=ontents$)/i, "c"),
  )).length;
}
