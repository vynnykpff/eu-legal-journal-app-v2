import Image from "next/image";

export function JournalCover({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "relative h-28 w-20 overflow-hidden rounded-md shadow-sm" : "relative aspect-[695/984] w-[330px] max-w-full overflow-hidden rounded-lg shadow-xl"}>
      <Image
        src="/images/journal-cover.jpg"
        alt="Обкладинка Європейського правничого часопису"
        fill
        sizes={compact ? "80px" : "330px"}
        className="object-cover"
        priority={!compact}
      />
    </div>
  );
}
