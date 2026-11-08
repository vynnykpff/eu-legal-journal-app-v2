import { notFound } from "next/navigation";
import { Shell } from "@/components/layout";
import { getStaticPage, PageHero, StaticContent } from "@/components/sections";
import { getLang } from "@/lib/routing";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  const page = getStaticPage(lang, "/publication-ethics");
  if (!page) notFound();

  return (
    <Shell lang={lang} active="/publication-ethics">
      <PageHero lang={lang} title={page.title} />
      <StaticContent page={page} />
    </Shell>
  );
}
