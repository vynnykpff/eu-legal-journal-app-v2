import { Shell } from "@/components/layout";
import { Card, LinkButton } from "@/components/ui";
import { getLocalizedPath } from "@/lib/data";
import { getDictionary } from "@/lib/i18n";
import { getLang } from "@/lib/routing";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  const dict = getDictionary(lang);

  return (
    <Shell lang={lang}>
      <section className="container py-16">
        <Card className="p-8 text-center">
          <h1 className="journal-title text-4xl font-bold text-primary">{dict.notFound.title}</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted">{dict.notFound.body}</p>
          <LinkButton className="mt-6" href={getLocalizedPath(lang, "/")}>{dict.notFound.home}</LinkButton>
        </Card>
      </section>
    </Shell>
  );
}
