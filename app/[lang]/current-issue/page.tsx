import { Shell } from "@/components/layout";
import { PageHero, ReleaseCard } from "@/components/sections";
import { Card } from "@/components/ui";
import { getReleases } from "@/lib/cms";
import { getLang } from "@/lib/routing";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  const [latest] = await getReleases(lang);

  return (
    <Shell lang={lang} active="/current-issue">
      <PageHero title="Поточний випуск" description="Найновіший випуск журналу з повними текстами статей та бібліографічними даними." />
      <section className="container mt-7 space-y-5">
        <ReleaseCard lang={lang} release={latest} showActions={false} />
        {!latest.articles.length && (
          <Card className="p-6 text-sm leading-6 text-[#33435c]">
            Статті для цього випуску ще не опубліковані в CMS. Сторінка зберігає структуру поточного випуску і автоматично покаже матеріали після додавання в архів або колекцію статей.
          </Card>
        )}
      </section>
    </Shell>
  );
}
