export function plainMarkdown(value: string) {
  return normalizeMarkdownSyntax(value)
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/\[([\s\S]*?)\]\(([\s\S]*?)\)/g, "$1")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/(?<![\p{L}\p{N}])([*_])([^\n]+?)\1(?![\p{L}\p{N}])/gu, "$2")
    .replace(/\\\[/g, "[")
    .replace(/\\\]/g, "]");
}

export function normalizeMarkdownSyntax(value: string) {
  return decodeHtmlEntities(value)
    .replaceAll("\\n", "\n")
    .replace(/\\\r?\n/g, "\n")
    .replace(/\\([\[\]()*_])/g, "$1")
    .replace(/\]\s+\(/g, "](");
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, decimal: string) => String.fromCodePoint(parseInt(decimal, 10)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}
