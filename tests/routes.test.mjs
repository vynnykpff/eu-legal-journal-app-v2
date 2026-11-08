import assert from "node:assert/strict";
import test from "node:test";
import { normalizeCmsLink } from "../lib/cms-links.ts";

const baseUrl = process.env.JOURNAL_TEST_URL;

function internalLinks(html) {
  return [...html.matchAll(/<a\b[^>]*\bhref="(\/(?:en|uk)(?:\/[^"?#]*)?)"/g)].map((match) => match[1]);
}

test("CMS menu links, language-switch destinations and published article pages are available", { skip: !baseUrl }, async () => {
  async function read(path) {
    const response = await fetch(new URL(path, baseUrl));
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.doesNotMatch(html, /NEXT_HTTP_ERROR_FALLBACK;404/, path);
    assert.match(html, new RegExp(`<html[^>]*lang="${path.split("/")[1]}"`), path);
    return html;
  }

  const paths = new Set(["/en/editor-policy", "/en/en/editor-policy", "/en/editorial-policy", "/uk/editorial-policy"]);
  for (const lang of ["en", "uk"]) {
    const home = await read(`/${lang}/`);
    const links = internalLinks(home);
    assert(links.some((path) => path.includes("/academic-integrity")), "Run against the public CMS to verify policy routes");
    for (const link of links) {
      assert(!/^\/(?:en|uk)\/(?:en|uk)(?:\/|$)/.test(link), `Duplicate locale in menu: ${link}`);
      paths.add(link);
      paths.add(normalizeCmsLink(lang === "en" ? "uk" : "en", link));
    }
    const archive = await read(`/${lang}/archive`);
    const articles = [...new Set(internalLinks(archive).filter((path) => path.includes("/articles/")))];
    assert(articles.length, `No article links in /${lang}/archive`);
    for (const article of [...articles.slice(0, 2), ...articles.slice(-2)]) {
      paths.add(article);
      paths.add(normalizeCmsLink(lang === "en" ? "uk" : "en", article));
    }
  }

  for (const path of paths) await read(path);
  const missing = await fetch(new URL("/en/this-page-does-not-exist", baseUrl));
  assert.equal(missing.status, 404);
});
