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

  if (cmsPage) {
    return (
      <Shell lang={lang}>
        <PageHero title={cmsPage.title} description={cmsPage.description} />
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
