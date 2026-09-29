import { notFound } from "next/navigation";
import { Shell } from "@/components/layout";
import { getStaticPage, PageHero, StaticContent } from "@/components/sections";
import { getLang } from "@/lib/routing";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  const page = getStaticPage("/publication-ethics");
  if (!page) notFound();

  return (
    <Shell lang={lang} active="/publication-ethics">
      <PageHero title={page.title} description={page.description} />
      <StaticContent page={page} />
    </Shell>
  );
}
