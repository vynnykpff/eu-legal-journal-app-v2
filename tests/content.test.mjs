import assert from "node:assert/strict";
import test from "node:test";
import { getArticleCount, fallbackReleases, indexingServices, pages } from "../lib/data.ts";
import { getDoiUrl, getOrcidUrl, splitReferenceLinks } from "../lib/article-links.ts";
import { plainMarkdown } from "../lib/markdown.ts";

test("article counts exclude front matter regardless of case, order or Cyrillic С", () => {
  const articles = ["ТИТУЛ", "Зміст", "Стаття 1", " СONTENTS ", "Стаття 2"].map((title) => ({ title }));
  assert.equal(getArticleCount({ articles }), 2);
  assert.equal(articles.length, 5);
  assert.equal(getArticleCount({ articles: [] }), 0);
  assert.equal(getArticleCount({ articles: [{ title: "Contents" }] }), 0);
});

test("article-only issues and fallback releases keep their counts", () => {
  for (const release of fallbackReleases) assert.equal(getArticleCount(release), release.articles.length);
  assert.equal(getArticleCount({ articles: [{ title: "Зміст правової норми" }, { title: "Contents of legal education" }] }), 2);
});

test("indexing has exactly the four requested services and linked detail entries", () => {
  assert.deepEqual(indexingServices.map(({ label }) => label), ["Наукова періодика України", "Google Scholar", "CrossRef", "Інституційний репозиторій ПВНЗ «Європейський університет»"]);
  assert.equal(pages["/indexing"].sections.length, 1);
  assert.equal(pages["/indexing"].sections[0].body.length, 4);
  assert.match(pages["/indexing"].sections[0].body[0], /Національна бібліотека України імені В\.І\. Вернадського/);
});

test("DOI URLs preserve parentheses and normalize resolver prefixes", () => {
  const doi = "10.36919/3041-1149(Print)14.2026.13-21";
  for (const value of [doi, `https://doi.org/${doi}`, `http://dx.doi.org/${doi}`, `DOI: ${doi}`]) {
    assert.equal(getDoiUrl(value), `https://doi.org/${doi}`);
  }
  assert.equal(getDoiUrl("javascript:alert(1)"), undefined);
});

test("ORCID URLs normalize bare identifiers, HTTP and X check digits", () => {
  for (const value of ["0000-0003-2716-9343", "http://orcid.org/0000-0003-2716-9343", "https://orcid.org/0000-0003-2716-9343/"]) {
    assert.equal(getOrcidUrl(value), "https://orcid.org/0000-0003-2716-9343");
  }
  assert.equal(getOrcidUrl("0000-0003-4246-974x"), "https://orcid.org/0000-0003-4246-974X");
  assert.equal(getOrcidUrl("not-an-orcid"), undefined);
});

test("references link multiple URLs and bare DOI without swallowing punctuation", () => {
  const value = "Джерело: https://example.org/path?a=1&b=2. DOI: 10.36919/3041-1149(Print)14.2026.13-21; (https://example.org/book).";
  const parts = splitReferenceLinks(value);
  assert.equal(parts.map(({ text }) => text).join(""), value);
  assert.deepEqual(parts.filter(({ href }) => href).map(({ href }) => href), [
    "https://example.org/path?a=1&b=2",
    "https://doi.org/10.36919/3041-1149(Print)14.2026.13-21",
    "https://example.org/book",
  ]);
});

test("references restore PDF spaces within URL paths", () => {
  const parts = splitReferenceLinks("URL: https://zakon.rada.gov.ua/laws/ show/3354-20#Text та https://www.bmjv.de/SharedDocs/Downloads/DE/ Fachpublikationen/Handbuch.pdf?__blob=publicationFile&v=4");
  assert.deepEqual(parts.filter(({ href }) => href).map(({ href }) => href), [
    "https://zakon.rada.gov.ua/laws/show/3354-20#Text",
    "https://www.bmjv.de/SharedDocs/Downloads/DE/Fachpublikationen/Handbuch.pdf?__blob=publicationFile&v=4",
  ]);
});

test("CMS summaries strip emphasis markers while preserving meaningful punctuation", () => {
  assert.equal(plainMarkdown("**Адреса редакції:** Київ, 16-В."), "Адреса редакції: Київ, 16-В.");
  assert.equal(plainMarkdown("_Остаточне рішення._"), "Остаточне рішення.");
  assert.equal(plainMarkdown("[*довідку про автора*](https://example.org/)"), "довідку про автора");
  assert.equal(plainMarkdown("Пн-Пт 09:00 – 17:00; author_name"), "Пн-Пт 09:00 – 17:00; author_name");
});
