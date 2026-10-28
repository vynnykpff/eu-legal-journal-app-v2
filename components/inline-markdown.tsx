import { normalizeMarkdownSyntax, plainMarkdown } from "@/lib/markdown";

export function renderInlineMarkdown(value: string) {
  const cleanValue = normalizeMarkdownSyntax(value);
  const parts = splitInlineMarkdown(cleanValue);

  return parts.map((part, index) => {
    if (part === "\n") return <br key={`${part}-${index}`} />;

    const boldLink = part.match(/^(?:\*\*|__)\[([\s\S]*)\]\(([\s\S]*?)\)(?:\*\*|__)$/);
    if (boldLink) {
      return (
        <a key={`${part}-${index}`} href={boldLink[2]} className="font-semibold text-primary underline underline-offset-2" target={boldLink[2].startsWith("http") ? "_blank" : undefined} rel={boldLink[2].startsWith("http") ? "noreferrer" : undefined}>
          <strong>{renderInlineMarkdown(boldLink[1])}</strong>
        </a>
      );
    }

    const link = part.match(/^\[([\s\S]*)\]\(([\s\S]*?)\)$/);
    if (link) {
      return (
        <a key={`${part}-${index}`} href={link[2]} className={link[1].toLowerCase().includes("оплат") ? "inline-flex rounded-md bg-accent px-4 py-2 font-semibold text-primary no-underline shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e4ad00] hover:shadow-md" : "font-semibold text-primary underline underline-offset-2"} target={link[2].startsWith("http") ? "_blank" : undefined} rel={link[2].startsWith("http") ? "noreferrer" : undefined}>
          {renderInlineMarkdown(link[1])}
        </a>
      );
    }

    const bold = part.match(/^(?:\*\*([\s\S]*?)\*\*|__([^_]+)__)$/);
    if (bold) return <strong key={`${part}-${index}`}>{renderInlineMarkdown(bold[1] ?? bold[2])}</strong>;

    const italic = part.match(/^(?:\*([^*]+)\*|_([^_]+)_)$/);
    if (italic) return <em key={`${part}-${index}`}>{renderInlineMarkdown(italic[1] ?? italic[2])}</em>;

    return <span key={`${part}-${index}`}>{plainMarkdown(part)}</span>;
  });
}

function splitInlineMarkdown(value: string) {
  const parts: string[] = [];
  let index = 0;

  while (index < value.length) {
    const nextLink = value.indexOf("](", index);
    if (nextLink === -1) break;

    let labelStart = nextLink - 1;
    while (labelStart >= index && value[labelStart] !== "[") labelStart -= 1;
    if (labelStart < index) {
      index = nextLink + 2;
      continue;
    }

    const hrefEnd = value.indexOf(")", nextLink + 2);
    if (hrefEnd === -1) break;

    const isBoldWrapped = value.slice(labelStart - 2, labelStart) === "**" && value.slice(hrefEnd + 1, hrefEnd + 3) === "**";
    const isStrongWrapped = value.slice(labelStart - 2, labelStart) === "__" && value.slice(hrefEnd + 1, hrefEnd + 3) === "__";
    const tokenStart = isBoldWrapped || isStrongWrapped ? labelStart - 2 : labelStart;
    const tokenEnd = isBoldWrapped || isStrongWrapped ? hrefEnd + 3 : hrefEnd + 1;

    if (tokenStart > index) parts.push(...splitTextMarkdown(value.slice(index, tokenStart)));
    parts.push(value.slice(tokenStart, tokenEnd));
    index = tokenEnd;
  }

  if (index < value.length) parts.push(...splitTextMarkdown(value.slice(index)));
  return parts.filter(Boolean);
}

function splitTextMarkdown(value: string) {
  return value.split(/(\*\*[\s\S]*?\*\*|__[^_]+__|(?<![\p{L}\p{N}])\*[^*\n]+\*(?![\p{L}\p{N}])|(?<![\p{L}\p{N}])_[^_\n]+_(?![\p{L}\p{N}])|\n)/gu).filter(Boolean);
}
