import { Shell } from "@/components/layout";
import { JournalPurpose, Hero, HomeCards } from "@/components/sections";
import { getCmsPages, getReleases } from "@/lib/cms";
import { getLocalizedPath } from "@/lib/data";
import { getLang } from "@/lib/routing";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  const [releases, cmsPages] = await Promise.all([getReleases(lang), getCmsPages(lang)]);
  const submissionPath = cmsPages.find((page) => /вимоги до публікацій|publication requirements/i.test(page.title))?.url ?? getLocalizedPath(lang, "/publication-requirements");
  const licensePath = cmsPages.find((page) => /відкритого доступу|open access/i.test(page.title))?.url ?? getLocalizedPath(lang, "/open-access");

  return (
    <Shell lang={lang} active="/">
      <Hero submissionPath={submissionPath} />
      <HomeCards lang={lang} latest={releases[0]} licensePath={licensePath} />
      <JournalPurpose />
    </Shell>
  );
}
