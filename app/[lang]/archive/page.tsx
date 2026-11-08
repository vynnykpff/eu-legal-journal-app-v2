import { Shell } from "@/components/layout";
import { ArchiveList, PageHero } from "@/components/sections";
import { getReleases } from "@/lib/cms";
import { getDictionary } from "@/lib/i18n";
import { getLang } from "@/lib/routing";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  const dict = getDictionary(lang);
  const releases = await getReleases(lang);

  return (
    <Shell lang={lang} active="/archive">
      <PageHero lang={lang} title={dict.archive.title} description={dict.archive.description} />
      <ArchiveList lang={lang} releases={releases} />
    </Shell>
  );
}
