export function getDoiUrl(value?: string): string | undefined {
  const doi = value?.trim().replace(/^(?:doi\s*:\s*|https?:\/\/(?:dx\.)?doi\.org\/)/i, "");
  return doi && /^10\.\d{4,9}\/\S+$/i.test(doi) ? `https://doi.org/${doi}` : undefined;
}

export function getOrcidUrl(value?: string): string | undefined {
  const orcid = value?.trim().replace(/^(?:orcid\s*:\s*|https?:\/\/orcid\.org\/)/i, "").replace(/\/$/, "");
  return orcid && /^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/i.test(orcid) ? `https://orcid.org/${orcid.toUpperCase()}` : undefined;
}

export function splitReferenceLinks(value: string): { text: string; href?: string }[] {
  // PDF-derived citations sometimes contain a line break or space after a path slash.
  const text = value.replace(/(https?:\/\/[^\s<>]+\/)\s+(?=[\w%.-]+(?:\/|[?#]|\.[a-z]{2,5}\b))/gi, "$1");
  const pattern = /https?:\/\/[^\s<>"«»]+|(?<![\w/])10\.\d{4,9}\/[^\s<>"«»]+/gi;
  const parts: { text: string; href?: string }[] = [];
  let cursor = 0;

  for (const match of text.matchAll(pattern)) {
    const start = match.index;
    let link = match[0].replace(/[.,;:!?]+$/, "");
    // Keep parentheses inside DOI suffixes, removing only citation punctuation.
    for (const [open, close] of [["(", ")"], ["[", "]"], ["{", "}"]]) {
      while (link.endsWith(close) && link.split(close).length > link.split(open).length) {
        link = link.slice(0, -1);
      }
    }
    if (start > cursor) parts.push({ text: text.slice(cursor, start) });
    parts.push({ text: link, href: getDoiUrl(link) ?? link });
    cursor = start + link.length;
  }

  if (cursor < text.length) parts.push({ text: text.slice(cursor) });
  return parts;
}
