import { Shell } from "@/components/layout";
import { ArchiveList, PageHero } from "@/components/sections";
import { getReleases } from "@/lib/cms";
import { getLang } from "@/lib/routing";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  const releases = await getReleases(lang);

  return (
    <Shell lang={lang} active="/archive">
      <PageHero title="Архів випусків" description="Ознайомтеся з архівними випусками «Європейського правничого часопису». Доступ до повних текстів статей відкрито для наукової спільноти та всіх зацікавлених читачів." />
      <ArchiveList lang={lang} releases={releases} />
    </Shell>
  );
}
