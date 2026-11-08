import { Shell } from "@/components/layout";
import { CmsEditorialBoard, EditorialBoard, PageHero } from "@/components/sections";
import { getCmsPageByPath } from "@/lib/cms";
import { getDictionary } from "@/lib/i18n";
import { getLang } from "@/lib/routing";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  const dict = getDictionary(lang);
  const page = await getCmsPageByPath(lang, `/${lang}/editorial-board`);

  return (
    <Shell lang={lang} active="/editorial-board">
      <PageHero lang={lang} title={dict.editorialBoard.title} />
      {page ? <CmsEditorialBoard lang={lang} blocks={page.content} /> : <EditorialBoard lang={lang} />}
    </Shell>
  );
}
