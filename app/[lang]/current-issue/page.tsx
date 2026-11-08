import { Shell } from "@/components/layout";
import { PageHero, ReleaseCard } from "@/components/sections";
import { Card } from "@/components/ui";
import { getReleases } from "@/lib/cms";
import { getDictionary } from "@/lib/i18n";
import { getLang } from "@/lib/routing";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  const dict = getDictionary(lang);
  const [latest] = await getReleases(lang);

  return (
    <Shell lang={lang} active="/current-issue">
      <PageHero lang={lang} title={dict.currentIssue.title} description={dict.currentIssue.description} />
      <section className="container mt-7 space-y-5">
        <ReleaseCard lang={lang} release={latest} showActions={false} />
        {!latest.articles.length && (
          <Card className="p-6 text-sm leading-6 text-[#33435c]">
            {dict.currentIssue.empty}
          </Card>
        )}
      </section>
    </Shell>
  );
}
