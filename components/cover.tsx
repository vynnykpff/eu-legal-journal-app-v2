import Image from "next/image";
import { getDictionary } from "@/lib/i18n";
import type { Lang } from "@/lib/types";

export function JournalCover({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  return (
    <div className={compact ? "relative h-28 w-20 overflow-hidden rounded-md shadow-sm" : "relative aspect-[695/984] w-[330px] max-w-full overflow-hidden rounded-lg shadow-xl"}>
      <Image
        src="/images/journal-cover.jpg"
        alt={getDictionary(lang).journal.coverAlt}
        fill
        sizes={compact ? "80px" : "330px"}
        className="object-cover"
        priority={!compact}
      />
    </div>
  );
}
