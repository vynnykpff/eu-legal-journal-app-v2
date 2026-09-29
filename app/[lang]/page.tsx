import { Shell } from "@/components/layout";
import { EditorMessage, Hero, HomeCards } from "@/components/sections";
import { getReleases } from "@/lib/cms";
import { getLang } from "@/lib/routing";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  const releases = await getReleases(lang);

  return (
    <Shell lang={lang} active="/">
      <Hero lang={lang} latest={releases[0]} />
      <HomeCards lang={lang} latest={releases[0]} />
      <EditorMessage />
      <section className="container mt-6 rounded-md bg-[#edf3ff] px-6 py-5 text-primary">
        <p className="max-w-4xl font-medium">Місія журналу — сприяти розвитку правничої науки, підтримувати академічну доброчесність та утверджувати верховенство права.</p>
      </section>
    </Shell>
  );
}
