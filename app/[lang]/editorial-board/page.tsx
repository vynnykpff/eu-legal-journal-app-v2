import { Shell } from "@/components/layout";
import { CmsEditorialBoard, EditorialBoard, PageHero } from "@/components/sections";
import { getCmsPageByPath } from "@/lib/cms";
import { getLang } from "@/lib/routing";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  const page = await getCmsPageByPath(lang, `/${lang}/editorial-board`);

  return (
    <Shell lang={lang} active="/editorial-board">
      <PageHero title="Редакційна колегія" description="Редакційна колегія забезпечує наукову якість, незалежність та об'єктивність публікацій у «Європейському правничому часописі»." />
      {page ? <CmsEditorialBoard blocks={page.content} /> : <EditorialBoard />}
    </Shell>
  );
}
