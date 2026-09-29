import { notFound } from "next/navigation";
import { languages } from "@/lib/data";
import type { Lang } from "@/lib/types";

export async function getLang(params: Promise<{ lang: string }>): Promise<Lang> {
  const { lang } = await params;
  if (!languages.includes(lang as Lang)) notFound();
  return lang as Lang;
}
