export type Lang = "uk" | "en";

export type Article = {
  id?: number;
  title: string;
  slug: string;
  authors: string;
  pages: string;
  journalTitle?: string;
  issue?: string;
  description?: string;
  doi?: string;
  file?: string;
  publishedAt?: string;
  abstract?: string;
  keywords?: string;
  fullText?: string[];
  references?: { key?: string; unstructured_citation?: string; doi?: string }[];
  structuredAuthors?: {
    given_name?: string;
    family_name?: string;
    orcid?: string;
    affiliation?: string;
  }[];
};

export type Release = {
  id?: number;
  title: string;
  issueNumber?: string;
  year: string;
  publicationDate: string;
  description: string;
  pdf?: string;
  articles: Article[];
};

export type StaticPage = {
  title: string;
  description: string;
  path: string;
  sections: { heading: string; body: string[] }[];
};

export type MenuChild = {
  id?: number;
  label: string;
  link: string;
};

export type MenuItem = MenuChild & {
  items: MenuChild[];
};

export type SiteSettings = {
  email: string;
  issn: string;
  logoHeader?: string;
  logoFooter?: string;
  copyrights: string;
};

export type CmsPage = {
  title: string;
  url: string;
  description: string;
  content: { component: string; content?: string; items?: string[]; isShowListMarks?: boolean; link?: string }[];
};
