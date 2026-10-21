import { notFound } from "next/navigation";
import { Shell } from "@/components/layout";
import { CmsContent, getStaticPage, PageHero, StaticContent } from "@/components/sections";
import { getCmsPageByPath } from "@/lib/cms";
import { getLang } from "@/lib/routing";

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string[] }> }) {
  const resolved = await params;
  const lang = await getLang(Promise.resolve({ lang: resolved.lang }));
  const path = `/${lang}/${resolved.slug.join("/")}`;
  const cmsPage = await getCmsPageByPath(lang, path);

  const isPolicy = ["academic-integrity", "withdrawal-procedure", "archiving-policy", "aI-policy", "compliance-principles", "editorial-policy", "review-policy", "access-policy"].includes(resolved.slug.join("/")) || /політик|policy|policies|ethics|ліценз|license|licensing/i.test(`${cmsPage?.title ?? ""} ${path}`);
  const isAuthorPage = ["requirements-for-publications", "publication-requirements", "publication-terms"].includes(resolved.slug.join("/"));

  if (cmsPage) {
    return (
      <Shell lang={lang}>
        <PageHero title={cmsPage.title} description={isPolicy || isAuthorPage ? undefined : cmsPage.description} />
        <CmsContent blocks={cmsPage.content} />
      </Shell>
    );
  }

  const staticPage = getStaticPage(`/${resolved.slug.join("/")}`);
  if (!staticPage) notFound();

  return (
    <Shell lang={lang}>
      <PageHero title={staticPage.title} description={staticPage.description} />
      <StaticContent page={staticPage} />
    </Shell>
  );
}
